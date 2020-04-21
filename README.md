# Attractions Salon

## Description of Features

-  Slideshow presenting photos of salon
- Provides user with location and directions to salon
- Lists services with description and pricing information
- Book Now service where users fill out form with contact information and time for appointment, this information gets sent to client, and will connect to the user who booked the appointment
- Payments page where user has the option to pay for services before the scheduled appointment
- Provides user with a list of reviews from past customers as well as ability to leave their own review
- Admin panel can be used by the client to update any information on the website

## Description and Navigation for Client to Update Admin Content Page 
## Admin Login (at this point in time)
- Email: admin@example.com 
- Password: test

## To get to Admin Panel:
1. Login as Admin
2. Click on the profile icon on the top right corner
3. Select “Go to Admin Panel”

## To add a service on the “Services” page
1. Get to Admin Panel
2. Go to Services Page on the left navigation bar
3. Select “Add a new Service” on the top navigation bar of Services Page
4. Fill in the information in the boxes, then select submit on the right of the page

## To update a service on the “Services” page
1. Get to Admin Panel
2. Go to Services Page on the left navigation bar
3. Select “Update a Service” on the top navigation bar of Services Page
4. Select the service to update, fill in the information in the boxes, then select submit on the right of the page

## To delete a service on the “Services” page
1. Get to Admin Panel
2. Go to Services Page on the left navigation bar
3. Select “Delete a Service” on the top navigation bar of Services Page
4. Select the service to delete, then select delete on the right of the page

## To approve a new testimonial
1. This process is done when a user adds a review to your website. Before it is added to your testimonials page it has to be approved by you.
2. Get to Admin Panel
3. Go to Testimonials Page on the left navigation bar
4. Select “Approve New Testimonial” on the desired testimonial of the Testimonials Page

## To delete a testimonial
1. After adding a testimonial to your site, you may change your mind and decide you want it taken off, in order to do this you follow these steps:
2. Get to Admin Panel
3. Go to Testimonials Page on the left navigation bar
4. Select “Delete Testimonials/Reviews” on the desired testimonial of the Testimonials Page

## Managing Your Users
This website allows users to create their own account. The main purpose of the “Users” section under the Miscellaneous header is to view and manage these user accounts.

## Viewing/Finding Users
Users are displayed in a list with the following headers:
- Name,
- Email,
- Phone, and
- Role.
For convenience, any administrator or owner roles are colored in the primary accent color. Clicking on any row will open the User Dialog with user-specific actions.

Another convenient feature is “Search.” In the text box above the list of users, type text to find users with matching names or emails. To clear this filter, click the “Clear Filters” button, located next to the search button.

## Understanding the User Dialog
The User Dialog is a popup-style modal that contains information about a specific user. Features include:
- View user’s name
- View user’s email
- View user’s phone number (if provided)
- Edit any of the previously mentioned values
- Execute administrative tasks

## Updating a user’s information
1. Once the user that requires modification is found, click on their row to open their User Dialog.
3. Once you confirm that you have the correct user, click the edit button on the top right-hand corner. This will transform the User Dialog into a series of text boxes with their corresponding labels.
3. Once you finish editing, click save to send your changes to the database.

## Change a user’s role
There are three roles in the current system model:
- Guest
  - Cannot access administrator panel
- Admin
  - Cannot change other user’s roles
- Owner
  - Full access

Under “Administrative Actions,” you can choose which role to set for the selected user. Keep in mind that only Owners can do this.

## Deleting a user
Once again, under “Administrative Actions,” you can select “Delete User” and click “Start Execution” in order to complete the task. Be warned, you cannot recover a deleted user.
