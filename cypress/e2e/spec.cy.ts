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

    it('should add a new job', () => {
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