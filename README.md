# Granny's Food
Granny's Food provides a simple way to browse and share your family recipes with friends, 
moving away from intricated recipes and favoring everyday ingredients that everyone can find. 


**Link to project:** https://https://grannysfood.cyclic.app/


## How It's Made:

**Tech used:** React, JavaScript, TailwindCSS, Node.js, Express.js, MongoDB

A MERN application structured using an MVC architecture. It uses jsonwebtoken and bcrypt libraries to handle user authentication, with a number of other middleware used to modify the response depending on the user. Posts and user information are stored in the Atlas MongoDB Cloud, with all CRUD operations handled by Mongoose, and the express application exposing a number of different endpoints to communicate with the API. 

Users have a variety of country and diet filters to browse recipes, as well as options to change the order of the results, changing the way the app retrieves information from the database. They can also access individual recipes to see their details, while logged in users are able to store recipes in their favorites, and can upload their own recipes to the site. The server then uses the multer middleware to handle the upload of images, and stores them in Cloudinary.

The views are handled by React, using modern function components with hooks. The different pages of the site are handled by react-router-dom, and the useContext hook is used to avoid prop drilling, storing the session and passing it in a more efficient way to the components that need it. The axios library is used to enable smooth client-server communication. The styling of the components is done in the JSX itself with TailwindCSS, which was also added as a dependency to compile CSS during the build process. 

## Optimizations

• Implement Google Auth 
• Allow users to modify their profile, having a description, change profile picture, etc.
• Improve the design of indivudual recipe page
• Add comments to individual recipes, allowing users to share pictures of their own preparation!
• There's some bloated components that could benefit from being broken down into additional components.
• Move the application into NextJS so that the server-side rendering can improve the SEO.


