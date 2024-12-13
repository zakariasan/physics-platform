import {
  Menu,
  MenuItem,
  Chip,
  Card,
  CardHeader,
  Button,
  CardContent,
  Accordion,
  Box,
  Typography,
  AccordionSummary,
  AccordionDetails,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mui/material";

import {
  MoreVertical,
  PencilLine,
  FilePlus,
  ListCollapse,
  Book,
  Trash2,
  FileText,
  Download,
  Upload,
  Clock,
  BookOpenText,
  FileUp,
  Ellipsis,
} from "lucide-react";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
function CourseCard({ course }) {
  console.log(course);
  // State for the menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Placeholder actions for menu items
  const handleCreateLesson = () => {
    console.log("Create Lesson clicked");
    handleMenuClose();
  };

  const handleAddMaterials = () => {
    console.log("Add Materials clicked");
    handleMenuClose();
  };

  const handleDeleteCourse = () => {
    console.log("Delete Course clicked");
    handleMenuClose();
  };

  const handleRenameCourse = () => {
    console.log("Rename Course clicked");
    handleMenuClose();
  };

  const theme = useTheme();

  const UploadMaterial = () => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <FileUp  class="w-5 h-5 text-blue-600"/>
        <div>
          <div className="font-medium">Upload Materials</div>
          <div className="text-sm text-gray-600">
            Upload your files Exercise or Pedagogical files here.
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Upload className="w-4 h-5"/>
      </Button>
    </div>

  );
  const MaterialFile = ({ file, type }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-blue-600" />
        <div>
          <div className="font-medium">{file.title}</div>
          <div className="text-sm text-gray-600">
            {type} • Uploaded {new Date(file.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );

  return (
    <Card className="mb-2">
      <CardHeader
        avatar={<Book className="text-blue-600" />}
        title={
          <Box>
            <Typography variant="h6" fontWeight="medium">
              {course.unite_name}
            </Typography>

            <Chip label={course.domaine} color="primary" />
            <Chip label={course.level} color="secondary" />
            <Chip label={course.unite_name} color="primary" />

          </Box>
        }
        action={
          <>
            <Button size="large" onClick={handleMenuOpen}>
              <Ellipsis className="w-6 h-6" />
            </Button>
            {/* Menu for course actions */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleCreateLesson}>

                <ListCollapse strokeWidth={2.25} className="w-6 h-6 mr-2" />
                <Typography>
                  Create Lesson
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleAddMaterials}>
                <FilePlus className="w-6 h-6 mr-2" />
                <Typography className="text-lg">Add Materials</Typography>
              </MenuItem>
              <MenuItem onClick={handleRenameCourse}>
                <PencilLine className="w-6 h-6 mr-2" />
                <Typography className="text-lg">Rename Unite</Typography>
              </MenuItem>
              <MenuItem onClick={handleDeleteCourse} style={{ color: "red" }}>
                <Trash2 className="w-6 h-6 mr-2" />
                <Typography className="text-lg">Delete Unite</Typography>
              </MenuItem>
            </Menu>
          </>
        }
      />

      <CardContent>
        <Accordion>
          <AccordionSummary>
            <Box display="flex" alignItems="center" gap={1}>
              <FileText
                fontSize="small"
                style={{ color: theme.palette.primary.main }}
              />
              <Typography variant="subtitle1">Course Materials</Typography>
            </Box>
          </AccordionSummary>

          <AccordionDetails>
            <Box sx={{ "& > *": { mb: 2 } }}>
              <MaterialFile
                file={{
                  title: "Lesson 1 - Introduction",
                  created_at: course.created_at,
                }}
                type="Lesson"
              />
              <MaterialFile
                file={{ title: "Homework 1", created_at: course.created_at }}
                type="Exercise"
              />
              <MaterialFile
                file={{
                  title: "Teaching Guide",
                  created_at: course.created_at,
                }}
                type="Pedagogical"
              />
              <UploadMaterial/>
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
