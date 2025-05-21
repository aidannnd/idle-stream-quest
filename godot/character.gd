extends Node2D

@onready var label = $Label

func set_username(username: String) -> void:
	label.text = username
