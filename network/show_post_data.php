<html>

<head>
</head>

<body>
	<p>$_REQUEST：</p>
	<article>
		<?php
		var_dump( $_REQUEST )
		?>
	</article>

	<p>$_GET：</p>
	<article>
		<?php
		var_dump( $_GET )
		?>
	</article>

	<p>$_POST：</p>
	<article>
		<?php
		var_dump( $_POST )
		?>
	</article>
	
	<p>$_FILES：</p>
	<article>
		<?php
		var_dump( $_FILES )
		?>
	</article>
	
	<p>json_decode(file_get_contents('php://input'))：</p>
	<article>
		<?php
		var_dump( json_decode(file_get_contents('php://input')) )
		?>
	</article>
	
</body>

</html>