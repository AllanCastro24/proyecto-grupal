const users = (app, pool) => {
  // login
  app.post('/users/login', (request, response) => {
    const user = request.body;

    pool.query(
      'SELECT id, rol_id, username, email, image FROM users WHERE username = ? AND password = ? AND status = ?',
      [user.username, user.password, 1],
      (error, result) => {
        if (error) throw error;

        const data = JSON.parse(JSON.stringify(result));

        let user = null;

        if (data.length > 0) {
          const result = data[0];

          user = {
            id: result.id,
            username: result.username,
            profile: {
              image: result.image,
            },
            work: {
              position: result.rol_id,
            },
            contacts: {
              email: result.email,
            },
          };
        }

        console.log(data);

        response.json({
          success: data.length > 0,
          data: user,
        });
      }
    );
  });

  // obtener datos de un usuario
  app.get('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('SELECT id, rol_id, username, email, image FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;

      response.json(result[0]);
    });
  });

  // agregar un usuario
  app.post('/users/add', (request, response) => {
    const user = request.body;

    console.log(user);

    if (!user.username || !user.password || !user.email) {
      response.json({
        success: false,
      });

      return;
    }

    pool.query(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`, [user.username, user.password, user.email], (error, result) => {
      if (error) throw error;

      response.json({
        success: !isNaN(result.insertId),
      });
    });
  });

  // actualizar un usuario
  app.post('/users/update', (request, response) => {
    const user = request.body;

    pool.query(
      'UPDATE users SET password = ?, email = ?, image = ? WHERE id = ?',
      [user.password, user.email, user.image, user.id],
      (error, result) => {
        if (error) throw error;

        response.end();
      }
    );
  });
};

// Export the users
module.exports = users;
