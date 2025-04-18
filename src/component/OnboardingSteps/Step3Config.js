import image5 from "../../assets/image5.png";
import image6 from "../../assets/image6.png";
import image7 from "../../assets/image7.png";
const Step3Config = [
  // {1}
  {
    type: "link",
    content: (
      <>
        Go to <a href="?">Cost and Usage Reports</a> in the Billing Dashboard
        and click on <strong>Create report.</strong>
      </>
    ),
  },
  // {2}
  {
    type: "hourly-cur",
    label: (
      <>
        Name the report as shown below and select the{" "}
        <strong>Include resource IDs </strong> checkbox-
      </>
    ),
    value: "ck-tuner-275595855473-hourly-cur",
    checkbox: (
      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="checkbox"
            checked
            disabled
            style={{ marginRight: "6px" }}
          />
          Include Resource IDs
        </label>
      </div>
    ),
    content: <>Ensure that the following configuration is checked</>,
    contents: (
      <>
        Click on <strong>Next</strong>
      </>
    ),
    img: image5,
  },
  // {3}
  {
    type: "bucket-name",
    label: (
      <>
        In <i>Configure S3 Bucket</i>, provide the name of the S3 bucket that
        was created -
      </>
    ),
    heading: <>Ensure that the following configuration is checked</>,
    checkbox: (
      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="checkbox"
            checked
            disabled
            style={{ marginRight: "6px" }}
          />
          The following default policy will be applied to your bucket
        </label>
      </div>
    ),
    contents: (
      <>
        Click on <strong>Save</strong>
      </>
    ),
    img1: image6,
  },
  // {4}
  {
    type: "delivery",
    label: (
      <>
        In the <i>Delivery options</i> section, enter the below-mentioned Report
        path prefix-
      </>
    ),
    content: <>Report path prefix:</>,
    value: "275595855473",
    text: <>Additionally, ensure that the following checks are in place</>,
    check: "Time granularity: ",
    radio: (
      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="radio"
            name="resourceIdOption"
            style={{ marginRight: "6px" }}
            checked
            disabled
          />
          Hourly
        </label>
      </div>
    ),
    para: "Please make sure these checks are Enabled in Enable report data integration for:",
    checkbox: (
      <div style={{ margin: "10px 0" }}>
        <label>
          <input
            type="checkbox"
            checked
            disabled
            style={{ marginRight: "6px" }}
          />
          Amazon Athena
        </label>
      </div>
    ),
    img2: image7,
  },
  // {5}
  {
    type: "paragraph",
    content: (
      <>
        Click on <strong>Next</strong>. Now, review the configuration of the
        Cost and Usage Report. Once satisfied, click on{" "}
        <strong>Create Report</strong>.
      </>
    ),
  },
];
export default Step3Config;
