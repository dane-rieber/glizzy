- Include a README in your repository:
    - Describe repo organization/structure 
    - Describe how to build/run/test code 
    - If using a Continuous Integration system, provide a link to the CI status page 

## TEST CASES:

User Acceptance Tests:
- Users should be able to add a grocery element to a list and see that item's information.
- Users should be able to submit a form to create an account.
- Users should be able to login to their account and access the appropriate list using a username and password.

Acceptance Criteria for above User Cases:
- A user can only submit a form to create an account if mandatory fields are completed.
-- Username
-- Password

- User should be able to login to their account
-- User information should be stored in the ‘user’ table in the ‘glizzy’ database
-- Information should be matched with the ‘user’ table in order to validate information

- User should be able to see item information
-- Item information should be stored in the ‘grocery’ table in the glizzy database
-- Item information should be retrieved from the database and shown on screen
-- Item information should include:
--- Name
--- Price
--- Store
--- Quantity
