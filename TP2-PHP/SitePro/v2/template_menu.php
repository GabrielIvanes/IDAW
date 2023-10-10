<?php

function renderMenuToHTML($currentPageId) {
    $mymenu = array(
    'index' => array( 'Accueil' ),
    'cv' => array( 'Cv' ),
    'projets' => array('Mes Projets')
    );

    echo '<nav class="menu">
    <ul>';
    foreach($mymenu as $pageId => $pageParameters) {
        foreach($pageParameters as $pageParameters => $pageLabel) {
            if ($pageId === $currentPageId) {
                echo '<li><a href="' .$pageId. '.php" id="currentpage">' .$pageLabel. '</a></li>';
            } else {
                echo '<li><a href="' .$pageId. '.php">' .$pageLabel. '</a></li>';
            }
        }  
       
    }
    echo '</ul>
    </nav>';
}
?>