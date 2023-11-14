// File: iam.ts
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const webAppRole = new aws.iam.Role("webAppRole", {
    assumeRolePolicy: `{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "ec2.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }`
});

const webAppPolicy = new aws.iam.Policy("webAppPolicy", {
    description: "A policy for the web application",
    policy: pulumi.output({
        Version: "2012-10-17",
        Statement: [{
            Action: [
                "ec2:Describe*",
                // Add other necessary permissions here
            ],
            Effect: "Allow",
            Resource: "*"
        }]
    }).apply(JSON.stringify)
});

new aws.iam.RolePolicyAttachment("webAppRolePolicyAttachment", {
    role: webAppRole.name,
    policyArn: webAppPolicy.arn
});



