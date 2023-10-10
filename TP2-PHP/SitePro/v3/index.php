<div class="main-wrapper">
    <div class="top">
        <?php require_once("template_header.php");require_once("template_menu.php");
  
  if(isset($_GET['page'])) {
    $currentPageId = $_GET['page'];
  } else {
    $currentPageId = 'accueil';
  }
  $currentPageIdFr = null;
  $currentPageIdEn = null;
   if(isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    
    switch ($currentPageId) {
      case "home":
        $currentPageIdFr = "accueil";
        break;
      case "projects":
        $currentPageIdFr = "projets";
        break;
      case "accueil":
        $currentPageIdEn = "home";
        break;
         case "projets":
        $currentPageIdEn = "projects";
        break;
    }
    
  } else {
    $lang = 'fr';
  }
?>
        <header class="bandeau_haut">
            <?php echo '<a href="index.php?page='.($lang === "fr" ? "accueil" : "home").'&lang='.$lang.'" >'?>
            <h1>Gabriel Ivanes</h1>
            </a>
        </header>
        <?php
echo '<a class="flag" href="index.php?page=' . ($currentPageIdFr === null ? ($currentPageIdEn === null ? $currentPageId : $currentPageIdEn) : $currentPageIdFr) . '&lang=' . ($lang === 'en' ? 'fr' : 'en') . '">';
?>

        <?php
echo $lang === 'fr' ? "<img src='./assets/united-kingdom.png' alt='united kingdom'/>" : "<img src='./assets/france.png'/>";
?>
        </a>



        <?php
  renderMenuToHTML($currentPageId, $lang);
?>



        <?php
$currentPageIdMaj = ucfirst($currentPageId);
 echo '<h1 class="page-title">'.$currentPageIdMaj.'</h1>'?>

        <hr />

        <section class="corps">
            <?php
            $currentPageIdFr !== null ?  $pageToInclude = $currentPageIdFr. ".php" : $pageToInclude = $currentPageId. ".php";
   
    if(is_readable($pageToInclude)) {
      require_once($pageToInclude);
    }
    else {
      require_once("error.php");
    }
  ?>
    </div>
    </section>
    <?php require_once("template_footer.php");?>
</div>