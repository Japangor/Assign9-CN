// File: loadBalancer.ts
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const alb = new aws.lb.LoadBalancer("alb", {
    internal: false,
    loadBalancerType: "application",
    securityGroups: [loadBalancerSg.id],
    subnets: ["subnet-0f92d9a3176b637ed"]
});

const targetGroup = new aws.lb.TargetGroup("targetGroup", {
    port: 80, 
    protocol: "HTTP",
    targetType: "instance",
    vpcId: "vpc-09b14a507db5e3bbe"
});

const listener = new aws.lb.Listener("listener", {
    loadBalancerArn: alb.arn,
    port: 80,
    defaultActions: [{
        type: "forward",
        targetGroupArn: targetGroup.arn
    }]
});
const route53Record = new aws.route53.Record("route53Record", {
    zoneId: "Z00677572A7I6AQG1MEP8",
    name: "japangor.com", // Replace with your domain
    type: "A",
    aliases: [{
        name: alb.dnsName,
        zoneId: alb.zoneId,
        evaluateTargetHealth: true
    }]
});
