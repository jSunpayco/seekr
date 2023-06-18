describe('Creating job applications', () => {
    beforeEach(() => {
        cy.visit('/jobs')
    });

    // Details for new job item
    let newJob = [
        { id: '#date', value: '2023-06-06' },
        { id: '#category', value: 'SWE' },
        { id: '#company', value: 'Random Company' },
        { id: '#location', value: 'City, State' },
        { id: '#status', value: 'Sent' },
        { id: '#title', value: 'New Junior Job' },
        { id: '#type', value: 'Full Time' },
        { id: '#url', value: 'https://www.google.com/' }
    ];

    it('should add a new job with empty title', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#title')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#titleError').should('be.visible').should('contain', 'Please enter a valid title');

        cy.end();
    });

    it('should add a new job with empty date', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#date')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#dateError').should('be.visible').should('contain', 'Please choose a valid date');

        cy.end();
    });

    it('should add a new job with empty category', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#category')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#categoryError').should('be.visible').should('contain', 'Please choose a valid category');

        cy.end();
    });

    it('should add a new job with empty company', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#company')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#companyError').should('be.visible').should('contain', 'Please enter a valid company');

        cy.end();
    });

    it('should add a new job with empty location', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#location')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#locationError').should('be.visible').should('contain', 'Please enter a valid location');

        cy.end();
    });

    it('should add a new job with empty status', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#status')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#statusError').should('be.visible').should('contain', 'Please choose a valid status');

        cy.end();
    });

    it('should add a new job with empty type', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#type')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#typeError').should('be.visible').should('contain', 'Please choose a valid Job Type');

        cy.end();
    });

    it('should add a new job with empty url', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            if(input.id !== '#url')
                cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#urlError').should('be.visible').should('contain', 'Please enter a valid URL');

        cy.end();
    });

    it('should add a new job with an invalid url', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        newJob[7].value = 'invalidURL'

        // Input values on all fields
        newJob.forEach((input) => {
            cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#urlError').should('be.visible').should('contain', 'Please enter a valid URL');

        newJob[7].value = 'https://www.google.com/'

        cy.end();
    });

    it('should add a new job with an invalid status', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        newJob[4].value = 'invalidStat'

        // Input values on all fields
        newJob.forEach((input) => {
            cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#statusError').should('be.visible').should('contain', 'Please choose a valid status');

        newJob[4].value = 'Sent'

        cy.end();
    });

    it('should add a new job with an invalid date', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        newJob[0].value = '3333-02-02'

        // Input values on all fields
        newJob.forEach((input) => {
            cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        // Look for error message
        cy.get('#dateError').should('be.visible').should('contain', 'Please choose a valid date');

        newJob[0].value = '2023-06-06'

        cy.end();
    });

    it('should add a new valid job', () => {
        // Open modal
        cy.get('#newJobContainer').click()

        // Input values on all fields
        newJob.forEach((input) => {
            cy.get(`${input.id}`).type(input.value, { force: true });
        });

        // Click submit button
        cy.get('#submitJobButton').click();

        cy.end();
    });
});

describe('Updating a job item', () => {
    beforeEach(() => {
        cy.visit('/jobs')
    });

    it('should update job status', () => {
        // Open modal
        cy.get('#update0').click()

        // Click status option
        cy.get('#radioOption2').click()

        // Open options
        cy.get('#datalistContainer2').click()

        // Click option
        cy.get('#statusOption20').click()

        // Click update button
        cy.get('#updateStatusButton').click()

        cy.end();
    });
});

describe('Deleting a job item', () => {
    beforeEach(() => {
        cy.visit('/jobs')
    });

    it('should cancel deleting the first job', () => {
        // Open modal
        cy.get('#delete0').click()

        // Check if correct job clicked
        cy.get('#deleteTitle').should('be.visible').should('contain', 'Delete Junior Software Engineer');

        // Click cancel button
        cy.get('#cancelDeleteButton').click()

        // Check if job still present
        cy.get('#job0').should('be.visible');

        cy.end();
    });

    it('should successfully delete the first job', () => {
        // Open modal
        cy.get('#delete0').click()

        // Check if correct job clicked
        cy.get('#deleteTitle').should('be.visible').should('contain', 'Delete Junior Software Engineer');

        // Click cancel button
        cy.get('#confirmDeleteButton').click()

        // Check if job is deleted
        cy.get('#job0').should('not.exist');

        cy.end();
    });
});