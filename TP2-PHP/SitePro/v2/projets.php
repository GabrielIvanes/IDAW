<?php require_once('template_header.php')?>
    <header>
      <h1>Projets</h1>
    </header>

    <hr />
    <div class="main">
      <?php require_once('template_menu.php'); renderMenuToHTML('projets');?>
      <div class="contenu">
        <div class="projet">
          <h2>PortFolio</h2>
          <h2>Tech stack: HTML, CSS, JS</h2>
          <p>Creation of my own portfolio website.</p>
          <br />
          <img src="assets/portfolio.png" alt="portfolio" />
        </div>
        <div class="projet">
          <h1>Movie App</h1>
          <h2>Tech stack: MERN (MongoDB, Express, Node.JS, React)</h2>
          <p>
            Creation of a full stack app to create list of films and search for
            movies, actors, tv show, directors, ...
          </p>
          <img src="assets/movieApp.png" alt="movieApp" />
        </div>
        <div class="projet">
          <h1>Weather app</h1>
          <h2>Tech stack: HTML, CSS, JS, API</h2>
          <p>
            Creation of an app displaying the weather of a location given in an
            input with google map API for the auto complete.
          </p>
          <a href="https://github.com/GabrielIvanes/meteo"
            ><i class="fab fa-github fa-2x"></i
          ></a>
          <br />
          <img src="assets/meteo.png" alt="meteo" />
        </div>
        <div class="projet">
          <h1>Games</h1>
          <h2>Tech stack: HTML, CSS, JS</h2>
          <p>
            Creation of games to improve my skills in basic language (Sudoku
            generator, connect four, 2048, ...)
          </p>
          <a
            href="https://github.com/GabrielIvanes?tab=repositories"
            class="github"
            ><i class="fab fa-github fa-2x"></i
          ></a>
        </div>
      </div>
    </div>
   <?php require_once('template_footer.php')?>
