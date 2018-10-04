#!/bin/bash

if [ "$TRAVIS_BRANCH" = "master" ]; 
    firebase use deafult;
    firebase deploy --token $FIREBASE_DEPLOY_TOKEN; 
else
    firebase use stage;
    firebase deploy --token $FIREBASE_STAGE_DEPLOY_TOKEN; 
fi
