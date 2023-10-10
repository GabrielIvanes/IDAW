<?php require_once('template_header.php')?>
    <div class="main-wrapper">
      <div class="top">
        <header>
          <h1>Accueil</h1>
        </header>
        <hr />
        <div class="main">
          <?php 
          require_once('template_menu.php'); renderMenuToHTML('index');
          ?>
          <div class="contenu">
            Hello ! My name is Gabriel and I'm actually in my second year of
            engineering school at IMT Nord Europe in the North of French. I've
            always been passionnate about computers science. My interest in web
            development started back in September 2022 when I took a course by
            myself on OpenClassrooms. Since then, I continue to develop my
            skills by taking new courses online and develop a few projects by my
            own.
          </div>
        </div>
      </div>
    <?php require_once('template_footer.php')?>
