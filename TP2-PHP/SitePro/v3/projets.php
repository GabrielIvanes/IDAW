<div class="contenu">
    <div class="projet">
        <h2>PortFolio</h2>
        <h3>Tech stack: HTML, CSS, JS</h3>
        <?php echo $lang === 'en' ? "<p>Creation of my own portfolio website.</p>" : "<p>Création de mon propre site portfolio.</p>" ?>
        <img src="assets/portfolio.png" alt="portfolio" />
    </div>
    <div class="projet">
        <?php echo $lang ==='en' ? "<h2>Movie App</h2>" : "<h2>Film App</h2>" ?>
        <h3>Tech stack: MERN (MongoDB, Express, Node.JS, React)</h3>
        <?php echo $lang === 'en' ? 
        "<p>
            Creation of a full stack app to create list of films and search for
            movies, actors, tv show, directors, ...
        </p>" : "<p>Création d'une application full stack pour créer des listes de films, séries et chercher des films, acteurs, séries, réalisateurs, ...</p>" ?>
        <img src="assets/movieApp.png" alt="movieApp" />
    </div>
    <div class="projet">
        <?php echo $lang ==='en' ? "<h2>Weather app</h2>" : "<h2>Application météo</h2>" ?>
        <h3>Tech stack: HTML, CSS, JS, API</h3>
        <?php echo $lang === 'en' ? "<p>
            Creation of an app displaying the weather of a location given in an
            input with google map API for the auto complete.
        </p>" : "<p>Création d'une application montrant la météo d'une localisation donnée dans un input avec une auto complétion avec Google maps API.</p>" ?>
        <a href="https://github.com/GabrielIvanes/meteo"><i class="fab fa-github fa-2x"></i></a>
        <br />
        <img src="assets/meteo.png" alt="meteo" />
    </div>
    <div class="projet">
        <?php echo $lang === 'en' ? "<h2>Games</h2>" : "<h2>Jeux</h2>" ?>
        <h3>Tech stack: HTML, CSS, JS</h3>
        <?php echo $lang === 'en' ? "<p>
            Creation of games to improve my skills in basic language (Sudoku
            generator, connect four, 2048, tic tac toe, ...)
        </p>" : "<p>Création de jeux pour améliorer mes compétences dans les languages basiques (générateur de sudoku, puissance 4, 2048, tic tac toe, ...).</p>" ?>
        <a href="https://github.com/GabrielIvanes?tab=repositories" class="github"><i
                class="fab fa-github fa-2x"></i></a>
    </div>
</div>