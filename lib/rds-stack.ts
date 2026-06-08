import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2"
import * as rds from "aws-cdk-lib/aws-rds"
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';

// Properties
interface RDSStackProps extends cdk.StackProps{
    vpc: ec2.Vpc
}

// Stacks
export class RDSStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props: RDSStackProps){
        super(scope, id, props)

        // RDS Instance 1
        const myDB = new rds.DatabaseInstance(this, "myDB", {
            engine: rds.DatabaseInstanceEngine.postgres({version: rds.PostgresEngineVersion.VER_18_3}),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
            credentials: {
                username: "admin",
                password: cdk.SecretValue.unsafePlainText("password")
            },
            vpc: props.vpc,
            vpcSubnets: {
                subnetGroupName: "Database",
                availabilityZones: props.vpc.availabilityZones
            },
            allocatedStorage: 20,
            maxAllocatedStorage: 30,
            deletionProtection: false,
            instanceIdentifier: "myDB",
            backupRetention: cdk.Duration.days(1)
        })

        cdk.Tags.of(myDB).add("Name", "My_Regional_DB")

        new cdk.CfnOutput(this, "DB Endpoint", {
            value: myDB.dbInstanceEndpointAddress,
            description: "DB Endpoint"
        })
    }
}

