import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Student from "./Student";
import studentData from "../data/StudentData";

function StudentList() {
    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Student List</h2>

            <Row>
                {studentData.map(student => (
                    <Col key={student.id} md={4} className="mb-4">
                        <Student student={student} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default StudentList;
