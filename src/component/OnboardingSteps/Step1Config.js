import arn from "../../assets/arn.png";
const OnboardingSteps = [
  {
    type: "link",
    content: (
      <>
        Log into AWS account&nbsp;
        <a href="https://cloudkeeper.com">Create an IAM Role</a>
      </>
    ),
  },
  {
    type: "code",
    label: (
      <>
        <strong>In the </strong>
        <i>Trusted entity type</i> section, select{" "}
        <strong>Custom trust policy</strong>. Replace the prefilled policy with
        the policy provided below -
      </>
    ),
    content: `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::951485052809:root"
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "Um9oaXRDS19ERUZBVUxUZDIzOTJkZTgtN2E0OS00NWQ3LTg3MzItODkyM2ExZTIzMjQw"
          }
        }
      },
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "s3.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }`,
  },
  {
    type: "text",
    content: (
      <>
        Click on <strong>Next</strong> to go to the <i>Add permissions page</i>.
        We would not be adding any permissions for now because the permission
        policy will depend on the AWS Account ID retrieved from the IAM Role.
        Click on <strong>Next</strong>.
      </>
    ),
  },
  {
    type: "readonly",
    label: (
      <>
        {" "}
        In the Role name field, enter the below-mentioned role name, and click
        on <strong>Create Role</strong> -
      </>
    ),
    value: "CK-Tuner-Role-dev2",
  },
  {
    type: "image",
    label: "Go to the newly created IAM Role and copy the Role ARN -",
    imageSrc: arn,
  },
];

export default OnboardingSteps;
