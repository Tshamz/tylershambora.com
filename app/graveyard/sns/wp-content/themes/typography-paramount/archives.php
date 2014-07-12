<?php get_header(); ?>  
  
    <?php get_sidebar(); ?>  
  
    <div id="content">  
  
    <h2 class="entry-title"><?php the_title() ?></h2>  
  
    <?php the_content() ?>  
  
                    <ul id="archives-page" class="xoxo">  
                        <li id="category-archives">  
                            <h2>Archives by Category</h2>  
                            <ul>  
                                <?php wp_list_categories('optioncount=1&title_li=&show_count=1') ?>  
                            </ul>  
                        </li>  
                        <li id="monthly-archives">  
                            <h2>Archives by Month</h2>  
                            <ul>  
                                <?php wp_get_archives('type=monthly&show_post_count=1') ?>  
                            </ul>  
                        </li>  
                    </ul>  
  
    </div>  
  
<?php get_footer(); ?>