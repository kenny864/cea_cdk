import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2"

// Props

interface EC2StackProps extends cdk.StackProps {
    vpc: ec2.Vpc
}

export class EC2Stack extends cdk.Stack{
    constructor(scope: Construct, id: string, props: EC2StackProps){
        super(scope, id, props);
    

        // EC2 Isntance 1

        const instance1 = new ec2.Instance(this, "Ec2P1", {
            vpc: props.vpc,
            vpcSubnets: {
                subnetGroupName: "App",
                availabilityZones: [props.vpc.availabilityZones[0]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO)
        })

        cdk.Tags.of(instance1).add("Name", "My1stPrivateEC2")

        // EC2 Isntance 2

        const instance2 = new ec2.Instance(this, "Ec2P2", {
            vpc: props.vpc,
            vpcSubnets: {
                subnetGroupName: "App",
                availabilityZones: [props.vpc.availabilityZones[1]]
            },
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO)
        })

        cdk.Tags.of(instance2).add("Name", "My2ndPrivateEC2")
    }
}