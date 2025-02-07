

Need to change the orbit controls too rotate the object instead of the camera as I have camera smoothing that auto goes to the locations so this will take over that


I have now added in functonality that allows you to smoothly transition to the selected area of the shirt when the button is clicked, and you are able to rotate the shirt around it's axis. This is different to how I've done it previously where I have multiple child objects that I would transition the camera to, each with their own location and rotation, that were parented to the central viewing object. This would mean that right rotation would be applied to the camera when coming up to that point. However I'm not sure it this is possible with three.js, and I have other things I need to build first. 


Added a variable that changes the shirt scale which replicates the camera zoom in. I set the min an max scales accordingly and the zoomin speed.















//=======================defalut test====================================



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
