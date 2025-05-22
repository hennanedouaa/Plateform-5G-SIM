from flask import Flask, request, jsonify , send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, to allow React frontend calls

# In-memory store for topology config (replace with DB if needed)
topology_data = {
    "numUPFs": 0,
    "upfConfigs": [],
    "numGNBs": 0,
    "gnbAssignments": {},
    "numUEs": "",
    "links": [],
    "dnsName": "Remote Surgery",
    "dnsUpfConnections": []
}

@app.route('/')
def home():
    return "Welcome to the Flask Server!"

@app.route('/api/topology/load', methods=['GET'])
def load_topology():
    # Return stored topology data
    return jsonify({"status": "success", "data": topology_data})

@app.route('/api/topology/save', methods=['POST'])
def save_topology():
    try:
        data = request.get_json()
        dns_name = data.get("dnsName") or "Remote Surgery"

        # Declare topology_data as global to update the global variable
        global topology_data

        # Validate and update topology_data with posted data
        topology_data = {
            "numUPFs": data.get("numUPFs", 0),
            "upfConfigs": data.get("upfConfigs", []),
            "numGNBs": data.get("numGNBs", 0),
            "gnbAssignments": data.get("gnbAssignments", {}),
            "links": data.get("links", []),
            "dnsName": dns_name,
            "dnsUpfConnections": data.get("dnsUpfConnections", [])
        }
        print("Topology Data:", topology_data)  # Ensure this line is present
        return jsonify({"status": "success", "message": "Topology saved."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400


@app.route('/api/topology/reset', methods=['POST'])
def reset_topology():
    global topology_data
    topology_data = {
        "numUPFs": 0,
        "upfConfigs": [],
        "numGNBs": 0,
        "gnbAssignments": {},
        "numUEs": "",
        "links": [],
        "dnsName": "Remote Surgery",
        "dnsUpfConnections": []
    }
    return jsonify({"status": "success", "message": "Topology reset to default."})

@app.route('/save_simulation', methods=['POST'])
def save_simulation():
    data = request.json
    print("Received simulation data:", data)  # Print the received data to the console
    return jsonify({"message": "Simulation configuration saved successfully!"})

# Static topology data
static_topology_data = {
    "upfCoords": [
        {"x": 0.3, "y": 0.2},  # UPF 1 (top-left)
        {"x": 0.7, "y": 0.2},  # UPF 2 (top-right)
        {"x": 0.3, "y": 0.8},  # UPF 3 (bottom-left)
        {"x": 0.7, "y": 0.8},  # UPF 4 (bottom-right)
        {"x": 0.5, "y": 0.5}   # UPF 5 (center)
    ],
    "gnbAssignments": {
        "0": [0, 4],  # gNB 1 connects to UPF 1 and central UPF 5
        "1": [1, 4],  # gNB 2 connects to UPF 2 and central UPF 5
        "2": [2, 4],  # gNB 3 connects to UPF 3 and central UPF 5
    },
    "links": [
        {"nodeA": "UPF 1", "nodeB": "UPF 5"},
        {"nodeA": "UPF 2", "nodeB": "UPF 5"},
        {"nodeA": "UPF 3", "nodeB": "UPF 5"},
        {"nodeA": "UPF 4", "nodeB": "UPF 5"}
    ],
    "dnsName": "Core Network",
    "dnsUpfConnections": [4]  # Only central UPF connects to DNS
}



def convert_topology_data(saved_data):
    """Convert saved topology data to visualization format"""
    # Calculate positions for UPFs in a grid pattern
    num_upfs = saved_data.get("numUPFs", 0)
    upf_coords = []
    
    if num_upfs > 0:
        rows = int(num_upfs ** 0.5) + 1
        cols = rows
        
        for i in range(num_upfs):
            row = i // cols
            col = i % cols
            x = (col + 1) / (cols + 1)
            y = (row + 1) / (rows + 1)
            upf_coords.append({"x": x, "y": y})
    
    return {
        "upfCoords": upf_coords,
        "gnbAssignments": saved_data.get("gnbAssignments", {}),
        "links": saved_data.get("links", []),
        "dnsName": saved_data.get("dnsName", "Remote Surgery"),
        "dnsUpfConnections": saved_data.get("dnsUpfConnections", [])
    }


@app.route('/api/simulation/static_topology', methods=['GET'])
def get_static_topology():
    static_topology_data = convert_topology_data(topology_data)
    print(static_topology_data)

    return static_topology_data

@app.route('/api/network-metrics', methods=['GET'])
def get_network_metrics():
    # In a real application, these values might be fetched from a database or calculated dynamically
    metrics = {
        'latency': 4,
        'packetLoss': 2,
        'jitter': 2
    }
    return jsonify(metrics)

@app.route('/api/qos-report', methods=['GET'])
def get_qos_report():
    # In a real application, this could be a path to a generated report file
    report_path = 'test.txt'  # Replace with the actual path to your report file
    return send_file(report_path, as_attachment=True)


if __name__ == '__main__':
    app.run(debug=True)