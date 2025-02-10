

--------------------Setting up the code---------------------

Navigate to fourth-try_Fabra-assignment\sauce\back-end in the termial and run `npm start`
fourth-try_Fabra-assignment\sauce\back-end>npm start

Navigate to fourth-try_Fabra-assignment\sauce\front-end in the termial and run `npm run dev'
fourth-try_Fabra-assignment\sauce\front-end>npm run dev'

Login is "testuser"
Password is "123"


------------------------------------------------------------





















--------------------------------------------progrss log------------------------------------------
Need to change the orbit controls too rotate the object instead of the camera as I have camera smoothing that auto goes to the locations so this will take over that

Have added and removed quite a few git repos, because I forgot to add a gitignore to the .next folder when I installed everything. 


I have now added in functonality that allows you to smoothly transition to the selected area of the shirt when the button is clicked, and you are able to rotate the shirt around it's axis. This is different to how I've done it previously where I have multiple child objects that I would transition the camera to, each with their own location and rotation, that were parented to the central viewing object. This would mean that right rotation would be applied to the camera when coming up to that point. However I'm not sure it this is possible with three.js, and I have other things I need to build first. 


Added a variable that changes the shirt scale which replicates the camera zoom in. I set the min an max scales accordingly and the zoomin speed.


Have finnaly got the login working. I had a really bad file structure so I had to redo that which caused more problems. The fix was the I had if !token and isLoginPage then redirect to loginPage which created an infinate loop where I could't redirect








