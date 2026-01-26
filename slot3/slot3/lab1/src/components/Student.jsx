import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Student({ student }) {
    const { id, name, age, major, avatar } = student;

    const handleViewDetail = () => {
        alert(
            `ID: ${id}\nName: ${name}\nAge: ${age}\nMajor: ${major}`
        );
    };

    return (
        <Card className="shadow-sm h-100" style={{ borderRadius: "15px" }}>
            <Card.Img
                variant="top"
                src={avatar}
                style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    margin: "15px auto 0"
                }}
            />

            <Card.Body className="text-center">
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    Age: {age} <br />
                    Major: {major}
                </Card.Text>

                <Button variant="primary" onClick={handleViewDetail}>
                    View Detail
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Student;
