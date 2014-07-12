<?php

class Struts_Option_Image extends Struts_Option {

	public function input_html() {
		$id = esc_attr( $this->html_id() );
		$name = esc_attr( $this->html_name() );
		$value = esc_attr( $this->value() );

		echo "<input type='text' id='$id' name='$name' value='$value' class='image-input' />";
		echo "<input type='button' id='{$id}_button' value='Upload Image' data-type='image' data-field-id='$id' class='button struts-image-upload'>";
	}

	protected function standard_validation( $value ) {
		return trim( $value );
	}
}