const table = $('#myTable').DataTable();

const serverUrl = 'http://localhost/IDAW/TP4/exo5/api/user';

async function getAllUser() {
  try {
    const response = await $.ajax({
      url: `${serverUrl}/read.php`,
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
      `
        <button onclick="onClickUpdate(event, ${user.id});"><i class='fas fa-edit icon'></i></button>
        <button onclick="onClickDelete(event, ${user.id});"><i class='fas fa-trash icon'></i></button>`,
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
      url: `${serverUrl}/create.php`,
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
      url: `${serverUrl}/delete.php`,
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
      url: `${serverUrl}/update.php`,
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

async function getOneUser(id) {
  try {
    const response = await $.ajax({
      url: `${serverUrl}/read_one.php?id=${id}`,
      method: 'GET',
      contentType: 'application/json',
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  let id = '';
  const name = $(inputName).val();
  const email = $(inputEmail).val();
  const cookies = document.cookie.split(';');
  for (cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === 'idUpdate') {
      id = value;
    }
  }

  if (id !== '') {
    updateUser(id, name, email);
    window.localStorage.clear('idUpdate');
  } else createUser(name, email);
  $(document).find('button.form-control').text('Submit');
}

function onClickDelete(event, id) {
  event.preventDefault();
  deleteUser(id);
}

async function onClickUpdate(event, id) {
  event.preventDefault();

  document.cookie = `idUpdate=${id}`;

  const { _, name, email } = await getOneUser(id);

  $(document).find('button.form-control').text('Update');
  $(inputName).val(name);
  $(inputEmail).val(email);
}

$(document).ready(function () {
  createTbody();
});
