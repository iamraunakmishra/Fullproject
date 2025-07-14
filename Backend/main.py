# backend/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Set
from collections import defaultdict

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://fullproject-khaki.vercel.app", 
    "http://localhost:3000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    """Defines the expected structure of a single node object from React Flow."""
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    """Defines the expected structure of a single edge (connection) object from React Flow."""
    id: str
    source: str
    target: str
    animated: bool = False

class PipelinePayload(BaseModel):
    """Defines the complete structure of the JSON payload expected from the frontend."""
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    """Returns a simple 'Ping: Pong' message."""
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse') 
async def parse_pipeline(payload: PipelinePayload):
    """
    Receives pipeline data (nodes and edges), calculates the number of nodes and edges,
    and checks if the graph forms a Directed Acyclic Graph (DAG).
    """
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)

    is_dag = True
    if num_edges > 0:
        is_dag = check_if_dag(payload.nodes, payload.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_if_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Determines if a graph represented by nodes and edges is a Directed Acyclic Graph (DAG).
    A graph is a DAG if it contains no directed cycles.
    This implementation uses a Depth-First Search (DFS) based cycle detection algorithm.
    """
    
    adj = defaultdict(list)
    
   
    all_node_ids: Set[str] = set()
    for node in nodes:
        all_node_ids.add(node.id)
    for edge in edges:
        adj[edge.source].append(edge.target)
        all_node_ids.add(edge.source)
        all_node_ids.add(edge.target)

    visited: Set[str] = set()
    recursion_stack: Set[str] = set()

    def dfs(node_id: str) -> bool:
        visited.add(node_id)
        recursion_stack.add(node_id)

        for neighbor in adj[node_id]:
            if neighbor not in visited:
                if not dfs(neighbor):
                    return False
            elif neighbor in recursion_stack:
                return False
        
        recursion_stack.remove(node_id)
        return True

    for node_id in all_node_ids:
        if node_id not in visited:
            if not dfs(node_id):
                return False

    return True
