import * as aws from '@pulumi/aws';
import { lbSecurityGroup } from './securityGroups';

export const appLoadBalancer = new aws.lb.LoadBalancer('appLoadBalancer', {
    internal: false,
    securityGroups: [lbSecurityGroup.id],
    subnets: ['subnet-01234abcd', 'subnet-56789efgh'], // Replace with actual subnet IDs
});

// Target Group
export const targetGroup = new aws.lb.TargetGroup('targetGroup', {
    port: 80,
    protocol: 'HTTP',
    vpcId: 'vpc-01a2b3c4d5e6f7890', 
    targetType: 'instance',
});

// Listener
export const listener = new aws.lb.Listener('listener', {
    loadBalancerArn: appLoadBalancer.arn,
    port: 80,
    defaultActions: [{
        type: 'forward',
        targetGroupArn: targetGroup.arn,
    }],
});
