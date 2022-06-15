#!/bin/bash
# ======================================================================
#
# UPDATE THEME
#
# requires git, rsync
#
# ----------------------------------------------------------------------
# 2022-05-26  v1.0
# 2022-06-15  v1.1  remove which and use --version param
# ======================================================================

# ----------------------------------------------------------------------
# CONFIG
# ----------------------------------------------------------------------

readonly git_repo_url="https://github.com/axelhahn/flatpress-theme-touch-of-glass.git"
readonly line="____________________________________________________________"
readonly version="1.1"

git_target=/tmp/git_data__atog
client_from="${git_target}/atog"
client_to="atog"

cd $( dirname "$0" ) || exit 1

# ----------------------------------------------------------------------
# FUNCTIONS
# ----------------------------------------------------------------------

# get data from a repo with git clone or git pull
# param string  url of public .git repo
# param string  local directory where to clone it
function _gitUpdate(){
    local _url=$1
    local _dirgit=$2
    local _rc=0
    if [ -d "$_dirgit" ]; then
        cd "$_dirgit" || exit 1
        _logBefore=$( git log -1 );
        echo "Update local data from repo... with git pull "
        git pull
        _logAfter=$( git log -1 ); 
        if [ "$_logBefore" != "$_logAfter" ]; then
            _rc=1
        fi
        cd - >/dev/null || exit 1
    else
        echo "Cloning..."
        git clone "$_url" "$_dirgit"
        _rc=$?
    fi
    return $_rc
}


# ----------------------------------------------------------------------
# MAIN
# ----------------------------------------------------------------------

cat <<ENDOFHEADER

          +-----------------------------------+
          |                                   |
          |  INSTALLER  |                     |
          |      +      |     ATOG THEME      |
          |   UPDATER   |                     |
          |                                   |
          +--------------------------- v$version --+

ENDOFHEADER

case "$1" in
    -h|--help)
        cat <<ENDOFHELP

    This is a helper script install or update the atog theme.

    This script clones and updates the repository in the /tmp 
    directory and syncs the theme files of it to a given directory.

    In the first run it works like an installer.
    On additional runs it updates the files.

    USAGE:

    $0 [target path]

        default target is [atog] (as subdir in current directory)

    $0 -h|--help

        Show this help.

ENDOFHELP
        exit 0
        ;;
    *)
        if test -n "$1" 
            then
            if  ! test -d "$1"
            then 
                echo "ERROR: target dir [$1] does not exist."
                exit 1
            fi
            echo "set target to $1"
            client_to="$1"
        fi
esac

rsync --version >/dev/null || exit 1
git --version >/dev/null || exit 1

echo $line
echo ">>> #1 of 3 >>> update local git data"
echo
echo "URL $git_repo_url"
echo "TO  $git_target"
if ! _gitUpdate "$git_repo_url" "$git_target"
then 
    echo ERROR occured :-/
    exit 1
fi
echo


echo $line
echo ">>> #2 of 3 >>> Sync files of Appmonitor client"
echo
echo "FROM $client_from/*" 
echo "TO   $client_to"
rsync -rav $client_from/* "$client_to"
echo

echo $line
echo ">>> #3 of 3 >>> Diff"
echo
diff -r "$client_from" "$client_to"
echo


echo $line
echo done.

# ----------------------------------------------------------------------
