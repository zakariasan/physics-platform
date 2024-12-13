import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import CourseCard from "./CourseCard";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { MoreVertical, Book, FileText, Download, Upload } from "lucide-react";

/******************
 * Course DashBoard: function to view add and delete a course.
 *
 */

function ViewCourse() {
  const { courses, getCourses } = useContext(AuthContext);
  useEffect(() => {
    getCourses();
    console.dir(courses);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Materials Management
          </h1>
          <p> Manage your courses, lessons, and teaching materials</p>
        </div>

      {/* Courses List */}
        <div className="space-y-6">
          {courses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewCourse;
