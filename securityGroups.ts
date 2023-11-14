// File: securityGroups.ts
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const loadBalancerSg = new aws.ec2.SecurityGroup("loadBalancerSg", {
    description: "Load balancer security group",
    ingress: [
        { protocol: "tcp", fromPort: 80, toPort: 80, cidrBlocks: ["0.0.0.0/0"] },
        { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] }
    ]
});

const appSg = new aws.ec2.SecurityGroup("appSg", {
    description: "EC2 App security group",
    ingress: [
        { protocol: "tcp", fromPort: 22, toPort: 22, cidrBlocks: ["0.0.0.0/0"] },
        { protocol: "tcp", fromPort: 80, toPort: 80, sourceSecurityGroupId: loadBalancerSg.id }
    ],
    egress: [
        { protocol: "-1", fromPort: 0, toPort: 0, cidrBlocks: ["0.0.0.0/0"] }
    ]
});
