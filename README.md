# Image Hospitals

A responsive patient-facing website for Image Hospitals, built with Node.js and deployed to the S3 bucket `qvargoproject2026`.

## Local development

Requires Node.js 20 or newer. The site has no runtime dependencies.

```sh
npm run build
npm run preview
```

The build output is written to `dist/` and can be hosted as a static website.

## GitHub Actions deployment

The CI workflow builds the website and uploads the `image-hospitals-site` artifact. After a successful build on `main`, the deploy workflow downloads that artifact and syncs it to `s3://qvargoproject2026`.

Add these Actions secrets in the repository settings before enabling deployment:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (the region where the bucket lives)

The AWS identity needs permission to list the bucket and put/delete objects in it. The bucket must already exist. Keep credentials in GitHub Actions secrets; do not commit them to the repository. The deploy workflow only runs for successful CI runs on `main`.

The site does not collect or store patient information. Appointment links initiate a phone call to the displayed number.

## Before launch

The provider names, locations, and phone number in the site are sample content. Replace them with verified Image Hospitals information before publishing. The appointment links currently call the displayed number; there is no online scheduling backend.
