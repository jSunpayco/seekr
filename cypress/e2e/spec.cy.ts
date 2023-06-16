describe('Performing CRUD operations with job applications', () => {
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

        cy.get('#titleError').should('be.visible').should('contain', 'Please enter a title');

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

        cy.get('#dateError').should('be.visible').should('contain', 'Please choose a date');

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

        cy.get('#categoryError').should('be.visible').should('contain', 'Please choose a category');

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

        cy.get('#companyError').should('be.visible').should('contain', 'Please enter a company');

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

        cy.get('#locationError').should('be.visible').should('contain', 'Please enter a location');

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

        cy.get('#statusError').should('be.visible').should('contain', 'Please choose a status');

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

        cy.get('#typeError').should('be.visible').should('contain', 'Please choose a Job Type');

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

        cy.get('#urlError').should('be.visible').should('contain', 'Please enter a URL');

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
})