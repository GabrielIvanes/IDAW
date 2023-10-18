const table = $('#myTable').DataTable();

async function getAllUser() {
  try {
    const response = await $.ajax({
      url: 'http://localhost/IDAW/TP4/exo5/api/user/read.php',
      method: 'GET',
      dataType: 'json',
    });

    return response.user;
  } catch (err) {
    console.error(err);
  }
}

async function createTbody() {
  table.clear();

  const users = await getAllUser();
  users.map((user) => {
    table.row.add([
      user.id,
      user.name,
      user.email,
      `<form action='' class='update' onsubmit="onFormUpdate(event);">
        <input class='idUpdate' type='hidden' value='${user.id}' />
        <input class='nameUpdate' type='hidden' value='${user.name}' />
        <input class='emailUpdate' type='hidden' value='${user.email}' />
        <button type='submit'><i class='fas fa-edit icon'></i></button>
      </form>
      <form action='' class='delete' onsubmit="onFormDelete(event);">
        <input name='idDelete' type='hidden' value='${user.id}' />
        <button type='submit'><i class='fas fa-trash icon'></i></button>
      </form>`,
    ]);
  });

  table.draw();
}

async function createUser(name, email) {
  const data = {
    name: name,
    email: email,
  };

  try {
    await $.ajax({
      url: 'http://localhost/IDAW/TP4/exo5/api/user/create.php',
      method: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    $(inputName).val('');
    $(inputEmail).val('');
    createTbody();
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser(id) {
  const data = {
    id: id,
  };

  try {
    await $.ajax({
      url: 'http://localhost/IDAW/TP4/exo5/api/user/delete.php',
      method: 'DELETE',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });
    createTbody();
  } catch (err) {
    console.error(err);
  }
}

async function updateUser(id, name, email) {
  const data = {
    id: id,
    name: name,
    email: email,
  };

  try {
    await $.ajax({
      url: 'http://localhost/IDAW/TP4/exo5/api/user/update.php',
      method: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json',
    });

    $(document).find('button.form-control').text('Submit');
    $(inputName).val('');
    $(inputEmail).val('');
    createTbody();
  } catch (err) {
    console.error(err);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const name = $(inputName).val();
  const email = $(inputEmail).val();

  const id = window.localStorage.getItem('idUpdate');

  if (id) {
    updateUser(JSON.parse(id), name, email);
    window.localStorage.clear('idUpdate');
  } else createUser(name, email);
  $(document).find('button.form-control').text('Submit');
}

function onFormDelete(event) {
  event.preventDefault();

  const id = $(event.target).parent().find('input').val();
  deleteUser(id);
}

function onFormUpdate(event) {
  event.preventDefault();

  const id = $(event.target).parent().find('.idUpdate').val();
  const name = $(event.target).parent().find('.nameUpdate').val();
  const email = $(event.target).parent().find('.emailUpdate').val();

  window.localStorage.setItem('idUpdate', JSON.parse(id));
  $(document).find('button.form-control').text('Update');
  $(inputName).val(name);
  $(inputEmail).val(email);
}

$(document).ready(function () {
  createTbody();
});
