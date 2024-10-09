#!/bin/bash

set -eux

(
    while true ; do
        pwd
        ls -al

        if [ "$PWD" = / ] ; then
            break
        fi

        cd ..
    done
)

jq -nS '$ENV'

which -a node || :
which -a npm || :
which -a pnpm || :
