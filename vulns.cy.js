describe('SQLi', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/sqli')
  })
  it('SQL Injection test', () => {
    // Submit the user id
    cy.get('input[name="id"]').type('\'OR 1=1#');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('not.contain', 'ID: ').should('not.contain', 'First name: ').should('not.contain', 'Surname: ')

    })
  })

  it('SQL table_name', () => {
    // Submit the user id
    cy.get('input[name="id"]').type('\'UNION SELECT table_name,NULL FROM information_schema.tables#');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('not.contain', 'ID: ').should('not.contain', 'First name: ').should('not.contain', 'Surname: ')

    })
  })

  it('SQL users table columns', () => {
    // Submit the user id
    cy.get('input[name="id"]').type('\'UNION SELECT column_name,NULL FROM information_schema.columns where table_name=\'users\'#');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('not.contain', 'ID: ').should('not.contain', 'First name: ').should('not.contain', 'Surname: ')

    })
  })

  it('SQL find user_name and passwords', () => {
    // Submit the user id
    cy.get('input[name="id"]').type('\'UNION SELECT user,password FROM users#');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('not.contain', 'ID: ').should('not.contain', 'First name: ').should('not.contain', 'Surname: ')

    })
  })
})

describe('SQLi BLIND', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/sqli_blind')
  })
  it('SQL Injection test', () => {
    // Submit the user id
    cy.get('input[name="id"]').type('\'OR 1=1#');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('not.contain', 'User ID exists in the database.')
    })
})
})


  describe('Command Injection', () => {
    it('pass a command', () => {
      cy.visit('http://127.0.0.1/DVWA/vulnerabilities/exec')
      const string = 'ceva12345'
      const input = "; echo " + "ceva12345"
        cy.get('.body_padded form').within( () => {
          
          cy.get('input[name="ip"]').type(input)
          cy.get('input[name="Submit"]').click()
    })
    cy.get('.vulnerable_code_area').should('not contain', string)
    })
  })

  describe('CSRF', () => {
    
  })


  describe('File inclusion', () => {
    // LOCAL file inclusion
    it("access uncommon files", () => { 
      cy.visit('http://127.0.0.1/DVWA/vulnerabilities/fi/?page=../../../../../../etc/passwd')
      const searchString = 'Failed'

    cy.window().then((win) => {
      const pageSource = win.document.documentElement.innerHTML;
      expect(pageSource).to.contain(searchString);
  })
})

    it("access hidden files", () => { 
      cy.visit('http://127.0.0.1/DVWA/vulnerabilities/fi/?page=file4.php')
      const searchString = 'Failed'

    cy.window().then((win) => {
      const pageSource = win.document.documentElement.innerHTML;
      expect(pageSource).to.contain(searchString);
    }) })

    // REMOTE file inclusion
    it("[REMOTE file inclusion] access google", () => { 
      cy.visit('http://127.0.0.1/DVWA/vulnerabilities/fi/?page=http://google.com')
      const searchString = 'Failed'

    cy.window().then((win) => {
      const pageSource = win.document.documentElement.innerHTML;
      expect(pageSource).to.contain(searchString);
    })
})
  })

  describe.only('XSS Reflected', () => {
     
    it ('alert pop-up window', () => {
      cy.visit('http://127.0.0.1/DVWA/vulnerabilities/xss_r')

      const js_code = "<script>alert(1)</script>"

      cy.get('input[type="text"]').type(js_code)
    // Stub the window alert
     cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });
    
    // Click on the button
    cy.get('input[type="submit"]').click()

    // Verify the alert was called with the correct message
    cy.get('@windowAlert').should('be.calledWith', '1');
  });
  })
