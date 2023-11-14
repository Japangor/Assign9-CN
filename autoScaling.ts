// File: autoScaling.ts
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Example User Data Script
const userDataScript = `#!/bin/bash
echo "Hello, World!" > /var/www/html/index.html
# Add more setup commands here
`;

const launchTemplate = new aws.ec2.LaunchTemplate("launchTemplate", {
    imageId: "ami-02401e017434fd6cb",
    instanceType: "t2.micro",
    keyName: "japangor",
    networkInterfaces: [{
        associatePublicIpAddress: true,
        securityGroups: [appSg.id]
    }],
    userData: Buffer.from(userDataScript).toString('base64'),
    iamInstanceProfile: {
        arn: webAppRole.arn
    }
});

const autoScalingGroup = new aws.autoscaling.Group("autoScalingGroup", {
    vpcZoneIdentifiers: ["subnet-0f92d9a3176b637ed"],
    maxSize: 3,
    minSize: 1,
    desiredCapacity: 1,
    launchTemplate: {
        id: launchTemplate.id,
        version: `$Latest`
    },
    tags: [{
        key: "Name",
        value: "web-app-instance",
        propagateAtLaunch: true
    }]
});
