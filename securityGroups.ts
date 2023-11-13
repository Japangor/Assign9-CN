import * as aws from '@pulumi/aws';

export const autoScalingRole = new aws.iam.Role('autoScalingRole', {
    assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
            Effect: 'Allow',
            Principal: {
                Service: 'ec2.amazonaws.com',
            },
            Action: 'sts:AssumeRole',
        }],
    }),
});

// Attach policies as needed...
