describe('DVWA Homepage Tests', () => {
  // inainte de fiecare test se viziteaza pagina de home a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Welcome :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', 'dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('have.class', 'selected').and('contain', 'Home');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', 'instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', 'setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', 'vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', 'vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', 'vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', 'vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', 'vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', 'vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', 'vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', 'vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', 'vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', 'vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', 'vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', 'vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', 'vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', 'vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', 'vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', 'security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', 'phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', 'about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', 'logout.php');
      });
    });
  });

  // Mesajul cu Welcome la h1
  it('Welcome message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Welcome to Damn Vulnerable Web Application!')
      cy.get('p').eq(0).should('contain', 'Damn Vulnerable Web Application (DVWA) is a PHP/MySQL web application that is damn vulnerable.')
    })
  });

// General Instruction
it('General instructions', () => {
  cy.get('#main_body .body_padded').within(() => {
    cy.get('h2').eq(0).should('contain', 'General Instructions')
    cy.get('p').eq(2).should('contain', 'It is up to the user how they approach DVWA.')
  })
});

// Warning Message
it('Warning message', () => {
  cy.get('#main_body .body_padded').within(() => {
    cy.get('h2').eq(1).should('contain', 'WARNING!')
    cy.get('p').eq(5).should('contain', 'Damn Vulnerable Web Application is damn vulnerable!')
  })
})
// Afisarea disclaimer-ului
it('Disclaimer', () => {
  cy.get('#main_body .body_padded').within(() => {
    cy.get('h3').should('contain', 'Disclaimer');
    cy.get('p').eq(6).should('contain', 'We do not take responsibility for the way in which any one uses this application (DVWA).');
  });
});

 // Afișarea resurselor suplimentare de training
 it('More training resources', () => {
  cy.get('#main_body .body_padded').within(() => {
    cy.get('h2').eq(2).should('contain', 'More Training Resources');
    cy.get('ul').within(() => {
      cy.get('li').eq(0).should('contain', 'Mutillidae').find('a').should('have.attr', 'href', 'https://github.com/webpwnized/mutillidae');
      cy.get('li').eq(1).should('contain', 'OWASP Vulnerable Web Applications Directory').find('a').should('have.attr', 'href', 'https://owasp.org/www-project-vulnerable-web-applications-directory');
    });
  });
});

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="dvwa/js/add_event_listeners.js"]').should('exist');

});

})

describe('DVWA BruteForcePage Tests', () => {
  // inainte de fiecare test se viziteaza pagina de brute force a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/brute/')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Brute Force :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Brute Force')
    })
  });

// Test pentru a verifica formularul de autentificare
it('Login form', () => {
  cy.get('.vulnerable_code_area').within(() => {
    cy.get('h2').should('contain', 'Login');
    cy.get('form').within(() => {
      cy.get('input[name="username"]').should('exist').and('have.attr', 'type', 'text');
      cy.get('input[name="password"]').should('exist').and('have.attr', 'type', 'password');
      cy.get('input[type="submit"]').should('have.value', 'Login');
    });
  });
});

// Test pentru a verifica funcționalitatea formularului de autentificare, cazul incorect
it('Error message on incorrect login', () => {
  cy.get('.vulnerable_code_area').within(() => {
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type('invalidUser');
      cy.get('input[name="password"]').type('invalidPass');
      cy.get('input[type="submit"]').click();
    });
  });

  // Verifică mesajul de eroare după trimiterea formularului
  cy.get('#main_body .body_padded').within(() => {
    cy.get('pre').should('contain', 'Username and/or password incorrect.');
  });
});

// Test pentru a verifica funcționalitatea formularului de autentificare, cazul corect
it('Correct login', () => {
  cy.get('.vulnerable_code_area').within(() => {
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type('admin');
      cy.get('input[name="password"]').type('password');
      cy.get('input[type="submit"]').click();
    });
  });

 // Verifică răspunsul după trimiterea formularului
 cy.get('#main_body .body_padded').within(() => {
  cy.contains('Welcome to the password protected area admin').should('exist');
});
});

  // Test pentru a verifica linkurile de informații suplimentare
  it('More information links', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h2').eq(1).should('contain', 'More Information');
      cy.get('ul').within(() => {
        cy.get('li').eq(0).should('contain', 'https://owasp.org/www-community/attacks/Brute_force_attack').find('a').should('have.attr', 'href', 'https://owasp.org/www-community/attacks/Brute_force_attack');
        cy.get('li').eq(1).should('contain', 'https://www.symantec.com/connect/articles/password-crackers-ensuring-security-your-password').find('a').should('have.attr', 'href', 'https://www.symantec.com/connect/articles/password-crackers-ensuring-security-your-password');
        cy.get('li').eq(2).should('contain', 'https://www.golinuxcloud.com/brute-force-attack-web-forms').find('a').should('have.attr', 'href', 'https://www.golinuxcloud.com/brute-force-attack-web-forms');
      });
    });
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA CommandInjectionPage Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/exec/')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Command Injection :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Command Injection')
    })
  });

// Test pentru a verifica afișarea secțiunii de ping
it('Ping section', () => {
  cy.get('.vulnerable_code_area h2').should('contain', 'Ping a device');
});

// Test pentru a verifica formularul de ping
it('Ping form', () => {
  cy.get('.vulnerable_code_area form[name="ping"]').within(() => {
    cy.get('input[name="ip"]').should('exist').and('have.attr', 'type', 'text');
    cy.get('input[type="submit"]').should('have.value', 'Submit');
  });
});

// Test pentru a verifica răspunsul corect la un IP valid
it('Ping result for a valid IP', () => {
  cy.get('.vulnerable_code_area form[name="ping"]').within(() => {
    cy.get('input[name="ip"]').type('127.0.0.1').should('have.value', '127.0.0.1');
    cy.get('input[type="submit"]').click();
  });

  // Verifică răspunsul după trimiterea formularului
  cy.get('.vulnerable_code_area').should('contain', 'PING 127.0.0.1');
});



  // Test pentru a verifica linkurile de informații suplimentare
  it('More information links', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h2').eq(1).should('contain', 'More Information');
      cy.get('ul').within(() => {
        cy.get('li').eq(0).should('contain', 'https://www.scribd.com/doc/2530476/Php-Endangers-Remote-Code-Execution').find('a').should('have.attr', 'href', 'https://www.scribd.com/doc/2530476/Php-Endangers-Remote-Code-Execution');
        cy.get('li').eq(1).should('contain', 'http://www.ss64.com/bash/').find('a').should('have.attr', 'href', 'http://www.ss64.com/bash/');
        cy.get('li').eq(2).should('contain', 'http://www.ss64.com/nt/').find('a').should('have.attr', 'href', 'http://www.ss64.com/nt/');
        cy.get('li').eq(3).should('contain', 'https://owasp.org/www-community/attacks/Command_Injection').find('a').should('have.attr', 'href', 'https://owasp.org/www-community/attacks/Command_Injection');
      });
    });
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA CSRFPage Tests', () => {
  // inainte de fiecare test se viziteaza pagina de coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/csrf/')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Cross Site Request Forgery (CSRF) :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Cross Site Request Forgery (CSRF)')
    })
  });

// Test pentru a verifica afișarea sectiunii de schimbare a parolei
it('Change password section', () => {
  cy.get('.vulnerable_code_area h3').should('contain', 'Change your admin password:');
});

// Test pentru a verifica formularul de schimbare a parolei și tipurile de input
it('Password change form with correct input types', () => {
  cy.get('.vulnerable_code_area form').within(() => {
    cy.get('input[name="password_new"]').should('exist').and('have.attr', 'type', 'password');
    cy.get('input[name="password_conf"]').should('exist').and('have.attr', 'type', 'password');
    cy.get('input[type="submit"]').should('have.value', 'Change');
  });
});

// Test pentru a verifica funcționalitatea formularului de schimbare a parolei
it('Accept new password and confirm password inputs', () => {
  cy.get('.vulnerable_code_area form').within(() => {
    const newPassword = 'pass';
    const confirmPassword = 'pass';

    cy.get('input[name="password_new"]')
      .type(newPassword)
      .should('have.value', newPassword);

    cy.get('input[name="password_conf"]')
      .type(confirmPassword)
      .should('have.value', confirmPassword);

    cy.get('input[type="submit"]').click();
  });

  // Verifică mesajul de succes sau de eroare după trimiterea formularului
  cy.get('.body_padded').should('contain', 'Password Changed.');
});

// Test pentru a verifica deschiderea ferestrei de testare a credențialelor

it('Test credentials window on button click', () => {
  // Stub the window.open method
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });

  // Click the "Test Credentials" button
  cy.get('#test_credentials button').click();

  // Check if window.open was called with the correct URL
  cy.get('@windowOpen').should('be.calledWith', '../../vulnerabilities/csrf/test_credentials.php');
});

  // Test pentru a verifica linkurile de informații suplimentare
  it('More information links', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h2').eq(0).should('contain', 'More Information');
      cy.get('ul').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'https://owasp.org/www-community/attacks/csrf').find('a').should('have.attr', 'href', 'https://owasp.org/www-community/attacks/csrf');
        cy.get('li').eq(1).should('contain', 'https://www.cgisecurity.com/csrf-faq.html').find('a').should('have.attr', 'href', 'https://www.cgisecurity.com/csrf-faq.html');
        cy.get('li').eq(2).should('contain', 'https://en.wikipedia.org/wiki/Cross-site_request_forgery').find('a').should('have.attr', 'href', 'https://en.wikipedia.org/wiki/Cross-site_request_forgery ');
      });
    });
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA FileUpload Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/upload/')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: File Upload :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: File Upload')
    })
  });



  it('File upload form elements', () => {
    // Check if the form exists and has the correct attributes
    cy.get('.vulnerable_code_area form')
      .should('exist')
      .should('have.attr', 'enctype', 'multipart/form-data')
      .should('have.attr', 'method', 'POST');

    // Check if the hidden input for MAX_FILE_SIZE exists and has the correct value
    cy.get('input[name="MAX_FILE_SIZE"]')
      .should('exist')
      .should('have.attr', 'value', '100000');

    // Check if the file input exists
    cy.get('input[name="uploaded"]')
      .should('exist')
      .should('have.attr', 'type', 'file');

    // Check if the submit button exists
    cy.get('input[name="Upload"]')
      .should('exist')
      .should('have.attr', 'type', 'submit')
      .should('have.attr', 'value', 'Upload');
  });

  it('Uploading a file', () => {
    // Simulate file upload
    const fileName = 'cat.jpeg'; // Replace with the correct file path
    const filePath = '../' + fileName;

    cy.get('input[name="uploaded"]').attachFile(filePath);

    // Submit the form
    cy.get('input[name="Upload"]').click();

    // Check for expected results after file upload
    cy.get('.body_padded').should('contain', '../../hackable/uploads/' + fileName  + ' succesfully uploaded!');
  });


    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
        cy.get('ul').eq(0).within(() => {
          cy.get('li').eq(0).should('contain', 'https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload').find('a').should('have.attr', 'href', 'https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload');
          cy.get('li').eq(1).should('contain', 'https://www.acunetix.com/websitesecurity/upload-forms-threat/').find('a').should('have.attr', 'href', 'https://www.acunetix.com/websitesecurity/upload-forms-threat/');
        });
      });
    });

  it('Help button', () => {
    // Check if the help button exists and has the correct data-help-url attribute
    cy.get('#help_button')
      .should('exist')
      .should('have.attr', 'data-help-url', '../../vulnerabilities/view_help.php?id=upload&security=low&locale=en');
  });

  it('Source button', () => {
    // Check if the source button exists and has the correct data-source-url attribute
    cy.get('#source_button')
      .should('exist')
      .should('have.attr', 'data-source-url', '../../vulnerabilities/view_source.php?id=upload&security=low');
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA InsecureCAPTCHA Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/captcha')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Insecure CAPTCHA :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Insecure CAPTCHA')
    })
  });

  
  it('Form incorrect CAPTCHA message', () => {
    cy.get('input[name="password_new"]').type('newpassword');
    cy.get('input[name="password_conf"]').type('newpassword');

    // Submit the form
    cy.get('input[name="Change"]').click();

    cy.get('.vulnerable_code_area').within(() => {
      cy.get('pre').should('contain', 'The CAPTCHA was incorrect. Please try again.')
    })
  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
        cy.get('ul').eq(0).within(() => {
          cy.get('li').eq(0).should('contain', 'https://en.wikipedia.org/wiki/CAPTCHA').find('a').should('have.attr', 'href', 'https://en.wikipedia.org/wiki/CAPTCHA');
          cy.get('li').eq(1).should('contain', 'https://www.google.com/recaptcha/').find('a').should('have.attr', 'href', 'https://www.google.com/recaptcha/');
          cy.get('li').eq(2).should('contain', 'https://owasp.org/www-project-automated-threats-to-web-applications/assets/oats/EN/OAT-009_CAPTCHA_Defeat').find('a').should('have.attr', 'href', 'https://owasp.org/www-project-automated-threats-to-web-applications/assets/oats/EN/OAT-009_CAPTCHA_Defeat');
        });
      });
    });

  it('Help button', () => {
    // Check if the help button exists and has the correct data-help-url attribute
    cy.get('#help_button')
      .should('exist')
  });

  it('Source button', () => {
    // Check if the source button exists and has the correct data-source-url attribute
    cy.get('#source_button')
      .should('exist')
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA SQLInjection Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/sqli')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: SQL Injection :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: SQL Injection')
    })
  });

  
  it('Submit user id', () => {
    // Check if exists
    cy.get('input[name="id"]').should('exist').should('have.attr', 'type', 'text');
    cy.get('input[name="Submit"]').should('exist').should('have.attr', 'type', 'submit');

    // Submit the user id
    cy.get('input[name="id"]').type('1');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('contain', 'ID: ').should('contain', 'First name: ').should('contain', 'Surname: ')

    })

  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
      });
    });

  it('Help button', () => {
    // Check if the help button exists and has the correct data-help-url attribute
    cy.get('#help_button')
      .should('exist')
  });

  it('Source button', () => {
    // Check if the source button exists and has the correct data-source-url attribute
    cy.get('#source_button')
      .should('exist')
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA SQLInjectionBlind Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/sqli_blind')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: SQL Injection (Blind) :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: SQL Injection (Blind)')
    })
  });

  
  it('Submit user id', () => {
    // Check if exists
    cy.get('input[name="id"]').should('exist').should('have.attr', 'type', 'text');
    cy.get('input[name="Submit"]').should('exist').should('have.attr', 'type', 'submit');

    // Submit the user id
    cy.get('input[name="id"]').type('1');
    cy.get('input[name="Submit"]').click();

    // Check the response
    cy.get('.body_padded').within(() => {
      cy.get('pre').should('contain', 'User ID exists in the database.')

    })

  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
      });
    });

  it('Help button', () => {
    // Check if the help button exists and has the correct data-help-url attribute
    cy.get('#help_button')
      .should('exist')
  });

  it('Source button', () => {
    // Check if the source button exists and has the correct data-source-url attribute
    cy.get('#source_button')
      .should('exist')
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})


describe('DVWA WeakIDs Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/weak_id')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Weak Session IDs :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Weak Session IDs')
    })
  });

  
  it('Generate cookie', () => {
    // Check if the form exists and has the POST method
    cy.get('form').should('exist').and('have.attr', 'method', 'post');

    // Click the "Generate" button
    cy.get('input[type="submit"]').click();

    // Check if the dvwaSession cookie is set
    cy.getCookie('dvwaSession').should('exist');

    // Verify the value of the dvwaSession cookie
    cy.getCookie('dvwaSession').then((cookie) => {
      expect(cookie.value).to.exist;
  });
})


  it('Help button', () => {
    // Check if the help button exists and has the correct data-help-url attribute
    cy.get('#help_button')
      .should('exist')
  });

  it('Source button', () => {
    // Check if the source button exists and has the correct data-source-url attribute
    cy.get('#source_button')
      .should('exist')
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA XSSDOM Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/xss_d')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: DOM Based Cross Site Scripting (XSS) :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: DOM Based Cross Site Scripting (XSS)')
    })
  });

  
  it('Language selection form', () => {
    // Check if the form exists and has the GET method
    cy.get('form[name="XSS"]').should('exist').and('have.attr', 'method', 'GET');

    // Check if the select element exists
    cy.get('select[name="default"]').should('exist');

    // Check if the select options are correctly populated
    const languages = ['English', 'French', 'Spanish', 'German'];

    languages.forEach(language => {
      cy.get('select[name="default"]').contains('option', language).should('exist');
    });
  });

  it('Submit the form', () => {
    // Select a language from the dropdown
    cy.get('select[name="default"]').select('French');

    // Submit the form
    cy.get('form[name="XSS"]').submit();

    // Check if the form submission updates the URL with the selected language
    cy.url().should('include', 'default=French');
  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
      });
    });

  it('Help button', () => {
    // Check if the help button exists and has the correct data-help-url attribute
    cy.get('#help_button')
      .should('exist')
  });

  it('Source button', () => {
    // Check if the source button exists and has the correct data-source-url attribute
    cy.get('#source_button')
      .should('exist')
  });

// Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')

  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA XSSReflected Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/xss_r')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Reflected Cross Site Scripting (XSS) :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Reflected Cross Site Scripting (XSS)')
    })
  });

  
  it('Form', () => {
    const name = 'Alex'
    const msg = 'Hello ' + name

    cy.get('.vulnerable_code_area form').within(() =>{
      cy.get('p').should('contain', "What's your name?")
      cy.get('input[type="text"]').should('exist');
      cy.get('input[type="submit"]').should('exist');
    
     
      cy.get('input[type="text"]').type(name)
      cy.get('input[type="submit"]').click()
        })
    
      cy.get('.vulnerable_code_area pre').should('contain', msg)
  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
      });
    });

  it('Help and Source buttons', () => {
    cy.get('#help_button')
      .should('exist')

    cy.get('#source_button')
      .should('exist')
    });

    // Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')
  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA XSS_Stored Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/xss_s')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: Stored Cross Site Scripting (XSS) :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: Stored Cross Site Scripting (XSS)')
    })
  });

  
  it('Display the guestbook form', () => {
    // Check if the form exists and has the POST method
    cy.get('form[name="guestform"]').should('exist').and('have.attr', 'method', 'post');

    // Check if the form fields exist
    cy.get('input[name="txtName"]').should('exist').and('have.attr', 'type', 'text').and('have.attr', 'maxlength', '10');
    cy.get('textarea[name="mtxMessage"]').should('exist').and('have.attr', 'cols', '50').and('have.attr', 'rows', '3').and('have.attr', 'maxlength', '50');

    // Check if the buttons exist
    cy.get('input[name="btnSign"]').should('exist').and('have.attr', 'type', 'submit').and('have.value', 'Sign Guestbook');
    cy.get('input[name="btnClear"]').should('exist').and('have.attr', 'type', 'submit').and('have.value', 'Clear Guestbook');
  });

  it('Validate the form submission', () => {

    const name = 'John Doe'
    const in_msg = 'This is a test message.'

    const out_msg1 = 'Name: ' + name
    const out_msg2 = 'Message: ' + in_msg

    // Fill out the form
    cy.get('input[name="txtName"]').type(name);
    cy.get('textarea[name="mtxMessage"]').type(in_msg);

    // Submit the form
    cy.get('input[name="btnSign"]').click();
    
    //Validating
    cy.get('#guestbook_comments').contains(out_msg1).contains(out_msg2).should('be.visible');
  });

  it('Confirm before clearing the guestbook', () => {
    const name = 'John Doe'
    const in_msg = 'This is a test message.'
    
    // Spy on the window.confirm method to intercept and test the confirmation dialog
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true);
    });

    // Fill out the form
    cy.get('input[name="txtName"]').type(name);
    cy.get('textarea[name="mtxMessage"]').type(in_msg);

    // Click the "Clear Guestbook" button
    cy.get('input[name="btnClear"]').click();

    // Verify that the confirmation dialog was shown and the form was cleared
    // This example assumes the form is cleared after confirmation
    cy.get('input[name="txtName"]').should('have.value', '');
    cy.get('textarea[name="mtxMessage"]').should('have.value', '');
  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
      });
    });

  it('Help and Source buttons', () => {
    cy.get('#help_button')
      .should('exist')

    cy.get('#source_button')
      .should('exist')
    });

    // Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')
  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})

describe('DVWA JavaScript Tests', () => {
  // inainte de fiecare test se viziteaza pagina coresp. a DVWA
  beforeEach(() => {
    cy.visit('http://127.0.0.1/DVWA/vulnerabilities/javascript')
  })

  // titlul aplicatiei e corect
  it('Correct title', () => {
    cy.title().should('eq', 'Vulnerability: JavaScript Attacks :: Damn Vulnerable Web Application (DVWA)')
  })

  // logo corect
  it('Main logo', () => {
    cy.get('#header img').should('have.attr', 'src', '../../dvwa/images/logo.png')
  })

  // se duce catre link-urile corecte
  it('Main menu with correct links', () => {
    cy.get('#main_menu_padded').within(() => {
      // prima parte de linkuri
      cy.get('ul.menuBlocks').eq(0).within(() => {
        cy.get('li').eq(0).should('contain', 'Home').find('a').should('have.attr', 'href', '../../.');
        cy.get('li').eq(1).should('contain', 'Instructions').find('a').should('have.attr', 'href', '../../instructions.php');
        cy.get('li').eq(2).should('contain', 'Setup / Reset DB').find('a').should('have.attr', 'href', '../../setup.php');
      });

      // a doua parte de linkuri
      cy.get('ul.menuBlocks').eq(1).within(() => {
        cy.get('li').eq(0).should('contain', 'Brute Force').find('a').should('have.attr', 'href', '../../vulnerabilities/brute/');
        cy.get('li').eq(1).should('contain', 'Command Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/exec/');
        cy.get('li').eq(2).should('contain', 'CSRF').find('a').should('have.attr', 'href', '../../vulnerabilities/csrf/');
        cy.get('li').eq(3).should('contain', 'File Inclusion').find('a').should('have.attr', 'href', '../../vulnerabilities/fi/.?page=include.php');
        cy.get('li').eq(4).should('contain', 'File Upload').find('a').should('have.attr', 'href', '../../vulnerabilities/upload/');;
        cy.get('li').eq(5).should('contain', 'Insecure CAPTCHA').find('a').should('have.attr', 'href', '../../vulnerabilities/captcha/');;
        cy.get('li').eq(6).should('contain', 'SQL Injection').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli/');;
        cy.get('li').eq(7).should('contain', 'SQL Injection (Blind)').find('a').should('have.attr', 'href', '../../vulnerabilities/sqli_blind/');;
        cy.get('li').eq(8).should('contain', 'Weak Session IDs').find('a').should('have.attr', 'href', '../../vulnerabilities/weak_id/');;
        cy.get('li').eq(9).should('contain', 'XSS (DOM)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_d/');;
        cy.get('li').eq(10).should('contain', 'XSS (Reflected)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_r/');;
        cy.get('li').eq(11).should('contain', 'XSS (Stored)').find('a').should('have.attr', 'href', '../../vulnerabilities/xss_s/');;
        cy.get('li').eq(12).should('contain', 'CSP Bypass').find('a').should('have.attr', 'href', '../../vulnerabilities/csp/');;
        cy.get('li').eq(13).should('contain', 'JavaScript').find('a').should('have.attr', 'href', '../../vulnerabilities/javascript/');;
        cy.get('li').eq(14).should('contain', 'Open HTTP Redirect').find('a').should('have.attr', 'href', '../../vulnerabilities/open_redirect/');;
      });

       // a treia parte de linkuri
       cy.get('ul.menuBlocks').eq(2).within(() => {
        cy.get('li').eq(0).should('contain', 'DVWA Security').find('a').should('have.attr', 'href', '../../security.php');
        cy.get('li').eq(1).should('contain', 'PHP Info').find('a').should('have.attr', 'href', '../../phpinfo.php');
        cy.get('li').eq(2).should('contain', 'About').find('a').should('have.attr', 'href', '../../about.php');
      });

      // a patra parte de linkuri
      cy.get('ul.menuBlocks').eq(3).within(() => {
        cy.get('li').eq(0).should('contain', 'Logout').find('a').should('have.attr', 'href', '../../logout.php');
      });
    });
  });

  // Mesajul cu vulnerabilitatea la h1
  it('Vulnerability message', () => {
    cy.get('#main_body .body_padded').within(() => {
      cy.get('h1').should('contain', 'Vulnerability: JavaScript Attacks')
    })
  });

  
  it('Display the form with correct attributes and default values', () => {
    // Check if the form exists and has the POST method
    cy.get('form[name="low_js"]').should('exist').and('have.attr', 'method', 'post');

    // Check if the hidden token input exists and has an empty value
    cy.get('input[name="token"]')
      .should('exist')
      .and('have.attr', 'type', 'hidden')

    // Check if the phrase input exists and has the default value
    cy.get('input[name="phrase"]')
      .should('exist')
      .and('have.attr', 'type', 'text')
      .and('have.value', 'ChangeMe');

    // Check if the submit button exists and has the correct attributes
    cy.get('input[name="send"]')
      .should('exist')
      .and('have.attr', 'type', 'submit')
      .and('have.attr', 'value', 'Submit');
  });

  it('Fill and submit the form', () => {
    // Fill out the form fields
    cy.get('input[name="phrase"]').clear().type('NewPhrase');

    // Submit the form
    cy.get('input[name="send"]').click();

    cy.contains('You got the phrase wrong.').should('be.visible');
  });

    // Test pentru a verifica linkurile de informații suplimentare
    it('More information links', () => {
      cy.get('#main_body .body_padded').within(() => {
        cy.get('h2').eq(0).should('contain', 'More Information');
      });
    });

  it('Help and Source buttons', () => {
    cy.get('#help_button')
      .should('exist')

    cy.get('#source_button')
      .should('exist')
    });

    // Afisarea informatiilor despre sistem
it('System info', () => {
  cy.get('#system_info').within(() => {
    cy.get('div').should('contain', 'Username:')
      .and('contain', 'Security Level:').and('contain', 'Locale:').and('contain', 'SQLi DB:')
  })
})

it('Footer', () => {
  cy.get('#footer').within(() =>
  {
    cy.get('p').should('contain', 'Damn Vulnerable Web Application (DVWA)')
  })
})

// Test pentru a verifica dacă scripturile necesare sunt încărcate
it('Correct scripts loaded', () => {
  cy.get('script[src="../../dvwa/js/dvwaPage.js"]').should('exist');
  cy.get('script[src="../../dvwa/js/add_event_listeners.js"]').should('exist');

});
})