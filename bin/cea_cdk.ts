#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { CeaCdkStack } from '../lib/cea_cdk-stack';
import { EC2Stack } from '../lib/ec2-stacks';
import { RDSStack } from '../lib/rds-stack';

const app = new cdk.App();
const vpcStack = new CeaCdkStack(app, 'CeaCdkStack', {

});

new EC2Stack(app, "MyEC2Stack", {
  vpc: vpcStack.vpc
})

new RDSStack(app, "MyRDSStack", {
  vpc: vpcStack.vpc
})

app.synth()