# tests/test_class.py

def test_create_class(client):
    # Step 1: Make a POST request to create a class
    response = client.post('/creat_class', json={'className': 'Physics_Tcs'})
    assert response.status_code == 201  # Check if class creation was successful
    assert response.json['msg'] == 'Class created successfully'


def test_get_classes(client):
    # Step 2: Create a new class
    client.post('/creat_class', json={'className': 'Math'})
    # Step 3: Make a GET request to retrieve the list of classes
    response = client.get('/get_classes')

    assert response.status_code == 200  # Check if the request was successful
    classes = response.json  # Get the list of classes from the response
    assert len(classes) == 1  # Verify there is only one class
    assert classes[0]['name'] == 'Math'  # Verify the class name
