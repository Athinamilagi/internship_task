### Backend Internship Task 2 - API Documentation for Nudge Creation

## Question

Below is the wireframe image that shows the requirement for creating a "nudge" for events or articles.

![Wireframe](https://github.com/Athinamilagi/internship_task/blob/main/task2/image.png)

The above wireframe is used as a reference for designing the API structure required to create a nudge. The following documentation outlines the API structure, endpoints, and expected payloads for implementing the required functionality.

#### **Overview**

This API is designed to allow users to create a "nudge" for events or articles. A nudge is a reminder or alert for users, which can include a title, image, schedule time, and additional descriptions. The nudge also supports an icon and a brief invitation text for display in minimized form.

#### **Base URL**

```
https://nudge/v1
```

#### **Endpoints**

1. **Create a Nudge**

   - **URL:** `/nudge/create`
   - **Method:** `POST`
   - **Description:** Allows the user to create a new nudge.
   - **Payload:**
     ```json
     {
       "eventTag": "string",
       "title": "string",
       "imageUrl": "string",
       "scheduleDate": "string",
       "scheduleTime": "string",
       "description": "string",
       "invitationText": "string"
     }
     ```
   - **Response:**
     ```json
     {
       "status": "success",
       "data": {
         "nudgeId": "string",
         "message": "Nudge created successfully"
       }
     }
     ```

2. **Get All Nudges**

   - **URL:** `/nudge`
   - **Method:** `GET`
   - **Description:** Retrieves all the nudges created by the user.
   - **Response:**
     ```json
     {
       "status": "success",
       "data": [
         {
           "nudgeId": "string",
           "eventTag": "string",
           "title": "string",
           "imageUrl": "string",
           "scheduleDate": "string",
           "scheduleTime": "string",
           "description": "string",
           "invitationText": "string"
         }
       ]
     }
     ```

3. **Get Nudge by ID**

   - **URL:** `/nudge/:id`
   - **Method:** `GET`
   - **Description:** Retrieves a single nudge by its unique ID.
   - **Response:**
     ```json
     {
       "status": "success",
       "data": {
         "nudgeId": "string",
         "eventTag": "string",
         "title": "string",
         "imageUrl": "string",
         "scheduleDate": "string",
         "scheduleTime": "string",
         "description": "string",
         "invitationText": "string"
       }
     }
     ```

4. **Update a Nudge**

   - **URL:** `/nudge/update/:id`
   - **Method:** `PUT`
   - **Description:** Updates an existing nudge with new data.
   - **Payload:** Same as the "Create a Nudge" payload.
   - **Response:**
     ```json
     {
       "status": "success",
       "data": {
         "nudgeId": "string",
         "message": "Nudge updated successfully"
       }
     }
     ```

5. **Delete a Nudge**

   - **URL:** `/nudge/delete/:id`
   - **Method:** `DELETE`
   - **Description:** Deletes an existing nudge by its ID.
   - **Response:**
     ```json
     {
       "status": "success",
       "data": {
         "message": "Nudge deleted successfully"
       }
     }
     ```

#### **Steps to Do**

1. Go through the wireframe in the image; it’s a page where a user can create a nudge for his/her event.
2. Create an Object data model for the Nudge; you can use the above model for reference.
3. Write documentation about how the API structure should be. The documentation should include the types of requests you want to perform, base URL, API Endpoints, Payload, and the description of the API.
4. You can use the above table (Table 1) for reference.
5. Write the documentation for the CRUD functionalities.

#### **Error Handling**

- If the MongoDB connection fails, the API will return a `500 Internal Server Error` with an appropriate error message.
- Validation errors will return a `400 Bad Request` status.
