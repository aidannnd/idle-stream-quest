extends Control

@onready var character_scene = preload("res://character.tscn")
var ws := WebSocketPeer.new()

func _ready():
	randomize()
	var url = "ws://localhost:8080"
	var err = ws.connect_to_url(url)
	if err != OK:
		print("Failed to connect: ", err)
	else:
		print("Connecting to ", url)

func _process(_delta):
	ws.poll()

	while ws.get_available_packet_count() > 0:
		var packet = ws.get_packet()
		var message = packet.get_string_from_utf8()
		_on_message_received(message)

func _on_message_received(message: String) -> void:
	print("Received: ", message)

	var parsed = JSON.parse_string(message)
	if parsed == null or typeof(parsed) != TYPE_DICTIONARY:
		print("Invalid JSON")
		return

	var data: Dictionary = parsed
	_handle_backend_message(data)

func _handle_backend_message(message: Dictionary) -> void:
	if message.get("event") == "join":
		spawn_character(message.get("username"))

func spawn_character(username: String) -> void:
	var character = character_scene.instantiate()
	add_child(character)
	character.position = Vector2(randi_range(100, 800), randi_range(100, 400))
	character.set_username(username)
