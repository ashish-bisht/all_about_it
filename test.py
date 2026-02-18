def print_all_dict(data, path):
    
    if not isinstance(data, dict):
        _path = ".".join(path)
        print(_path,data)
        return
    
    if not data:
        return 
    for key, val in data.items():
        path.append(key)
        # _path = ".".join(path)
        # print(_path,val)
        
        print_all_dict(val, path)
        path.pop()
        
        


data = {
    "name": "Ash",
    "age": 30,
    "address": {
        "city": "Bangalore",
        "pincode": "560001",
        "coords": {
            "lat": 12.97,
            "lng": 77.59
        }
    },
    "skills": None,
    "company": {
        "name": "Oracle",
        "team": {
            "name": "OCI",
            "size": 10
        }
    }
}

print(print_all_dict(data, []))