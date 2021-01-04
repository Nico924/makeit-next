#!/bin/sh

MYPWD=${PWD}  #or MYPWD=$(pwd)

# ASK FOR INPUT 
# echo " /!!!!\ Did you create the build first ?? (y/n)"?
# read response

# if [ "$response" == "y" ]; then
#     echo "Continuing"
# else
#     exit
# fi

# DEFINE REMOTE CONFIG
HOST="makeit-studio.com"
USERNAME="root"
H_FOLDER="/home"
R_FOLDER="$H_FOLDER/www/$HOST"


# DOCKER CONFIG
CONTAINER_NAME="makeit-frontend-service"

# DEFINE PARAMS
DATE=`date '+%Y-%m-%d-%H-%M'`
PROJECT_NAME="$HOST"


# [LOCAL] ZIP with removing node_modules files
zip -r -q "$PROJECT_NAME+$DATE.zip" .
# [LOCAL] Send the folder
scp "$PROJECT_NAME+$DATE.zip" $USERNAME@188.166.18.43:"$R_FOLDER/$PROJECT_NAME+$DATE.zip"
# [LOCAL] Remove the zip
rm "$PROJECT_NAME+$DATE.zip"


# # [REMOTE] Remove the folder
CMD_1="rm -r $R_FOLDER/client; rm -r $R_FOLDER/server"

# # [REMOTE] Unzip
CMD_2="unzip -q -o $R_FOLDER/$PROJECT_NAME+$DATE.zip -d $R_FOLDER/"
# # [REMOTE] Remove the zip
CMD_3="rm $R_FOLDER/$PROJECT_NAME+$DATE.zip"

# # [REMOTE] Relaunch docker
CMD_4="docker-compose -f $H_FOLDER/docker-compose.yaml build --no-cache $CONTAINER_NAME"
CMD_5="docker-compose -f $H_FOLDER/docker-compose.yaml up --force-recreate -d $CONTAINER_NAME"
CMD_6="docker-compose -f $H_FOLDER/docker-compose.yaml logs -t -f $CONTAINER_NAME"

ssh $USERNAME@188.166.18.43 "$CMD_1; $CMD_2; $CMD_3; $CMD_4; $CMD_5; $CMD_6"