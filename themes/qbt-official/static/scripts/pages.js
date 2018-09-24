// links pages
$('body').append(
	'<div class="gh-pages"> \
		<style> \
			.gh-pages { position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #ccc; border-right: none; border-bottom: none; width: 220px; font-family: Tahoma, Verdana, Segoe, sans-serif; } \
			.gh-pages__collapse {} \
			.gh-pages__close {  } \
			#pages { padding: 10px 20px 15px 40px; font-size: 14px; letter-spacing: .02em; color:#010101; } \
			#pages a { text-decoration: none; color:#010101; } \
			#pages li { margin: 5px 0; } \
			.gh-pages__head { text-align: right;  } \
			.gh-pages__head a { text-align: center; background:#ccc; color:#000; display: inline-block; width: 30px; height: 30px; line-height: 30px; text-decoration: none; font-size: 14px } \
			.gh-pages_collapse .gh-pages__body { display: none;} \
		</style> \
		<div class="gh-pages__head"> \
			<a href="javascript:void(0);" class="gh-pages__collapse" onclick="$(this).closest(\'.gh-pages\').toggleClass(\'gh-pages_collapse\')">_</a> \
			<a href="javascript:void(0);" class="gh-pages__close" onclick="$(this).closest(\'.gh-pages\').hide()">X</a> \
		</div> \
		<div class="gh-pages__body"> \
			<ol id="pages" style="margin:0;"> \
				<li><a href="index.html">Home</a></li> \
				<li><a href="vacancy.html">Vacancy</a></li> \
				<li><a href="careers.html">Careers</a></li> \
				<li><a href="services.html">Services</a></li> \
				<li><a href="about.html">About</a></li> \
				<li><a href="projects.html">Projects</a></li> \
				<li><a href="project.html">Project</a></li> \
				<li><a href="project-longread.html">Project longread</a></li> \
				<li><a href="news.html">News</a></li> \
				<li><a href="news-image.html">News - image</a></li> \
				<li><a href="news-no-image.html">News - no image</a></li> \
				<li><a href="solutions.html">Solutions</a></li> \
				<li><a href="solution.html">Solution</a></li> \
				<li><a href="partners.html">Partners</a></li> \
				<li><a href="contacts.html">Contacts</a></li> \
				<li><a href="team.html">Team</a></li> \
				<li><a href="wiki.html">Wiki</a></li> \
				<li><a href="404.html">404</a></li> \
			</ol> \
		</div> \
</div>');
