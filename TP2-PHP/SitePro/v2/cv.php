<?php require_once('template_header.php')?>
    <div class="main-wrapper">
      <div class="top">
        <header>
          <h1>CV</h1>
        </header>

        <hr />
        <div class="main">
         <?php require_once('template_menu.php');renderMenuToHTML('cv');?>
          <div class="contenu">
            <h1>Experiences</h1>
            <div class="imtne">
              <h2>
                First year of engineering school
                <strong>Institut Mines-Télécom Nord Europe</strong>
              </h2>
              <h3>September 2022 - Present</h3>
              <ul class="text-experiences-ul">
                <li>I will graduate in 2025</li>
                <li>
                  Study of basic sciences, computer science, economics and
                  management
                </li>
                <li>
                  Systems, networks & security, Software engineering and
                  information systems
                </li>
              </ul>
            </div>
            <div class="bp">
              <h2>
                Computer security technician internship
                <strong>Banque Populaire du Nord</strong>
              </h2>
              <h3>May 2022 - July 2022</h3>
              <ul class="text-experiences-ul">
                <li>
                  Quality control of the computer security risk map and
                  integration of BRS files (Business Risk Situations)
                </li>
                <li>
                  Creating reports, dashboards and alerts for computer security
                  on Splunk
                </li>
              </ul>
            </div>
            <div class="cerballiance">
              <h2>
                Company discovery internship <strong>Cerballiance</strong>
              </h2>
              <h3>February 2021 - April 2021</h3>
              <ul class="text-experiences-ul">
                <li>
                  Inventory and referencing of Cerballiance's computer equipment
                  in autonomy
                </li>
                <li>Mission of maintenance of the computer park</li>
                <li>
                  Installation, mixing and management of materials to make a new
                  room operational in autonomy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <?php require_once('template_footer.php')?>
