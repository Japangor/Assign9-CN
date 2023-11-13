import * as aws from '@pulumi/aws';
import { ec2SecurityGroup } from './securityGroups';
import { autoScalingRole } from './iam';

export const autoScalingGroup = new aws.autoscaling.Group('autoScalingGroup', {
    maxSize: 3,
    minSize: 1,
    desiredCapacity: 1,
    vpcZoneIdentifiers: ['subnet-01234abcd', 'subnet-56789efgh'], 
    launchTemplate: {
        id: 'lt-01a2b3c4d5e6f7890', 
        version: `$Latest`,
    },
    tags: [
        { key: 'Name', value: 'my-autoscaling-group', propagateAtLaunch: true },
    ],
});
