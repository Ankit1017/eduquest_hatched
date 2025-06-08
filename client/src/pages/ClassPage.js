import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Tabs,
  Tab,
  Button,
  Avatar,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useClass } from "../context/ClassContext";
import { AuthContext } from "../context/AuthContext";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StreamIcon from "@mui/icons-material/DynamicFeed";
import CloseIcon from "@mui/icons-material/Close";
import { Navbar } from "../components/NavbarManager";

const NAVBAR_HEIGHT = 72;

const darkTheme = {
  background: "#121212",
  card: "#181c24",
  accent: "#64b5f6",
  border: "1px solid rgba(255,255,255,0.07)",
  textPrimary: "#e3f2fd",
  textSecondary: "#90caf9",
};

const drawerWidth = 260;

function ClassPage() {
  const { classId } = useParams();
  const { classes, fetchClasses, loading } = useClass();
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      fetchClasses(user._id);
    }
    // eslint-disable-next-line
  }, [user?._id, fetchClasses]);

  const selectedClass = classes.find((c) => c.classId === classId);

  const streamPosts = [
    {
      id: 1,
      type: "material",
      author: "23/PHDDS/501 VIVEK PANT",
      date: "Apr 21, 2024",
      content: "Posted a new material: Unit 5",
      icon: <AssignmentIcon />,
    },
    {
      id: 2,
      type: "material",
      author: "23/PHDDS/501 VIVEK PANT",
      date: "Apr 21, 2024",
      content: "Posted a new material: Unit 3",
      icon: <AssignmentIcon />,
    },
    {
      id: 3,
      type: "announcement",
      author: "23/PHDDS/501 VIVEK PANT",
      date: "Apr 19, 2024",
      content: "Class test is scheduled on 24.04.2024 at 04:00 PM.",
      icon: <StreamIcon />,
    },
  ];

  const sidebar = (
    <Box
      sx={{
        height: "100%",
        bgcolor: darkTheme.card,
        color: darkTheme.textPrimary,
        borderRight: darkTheme.border,
        py: 3,
        px: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ px: 3, mb: 2, display: "flex", alignItems: "center", gap: 1 }}
      >
        <SchoolIcon sx={{ color: darkTheme.accent, fontSize: 28 }} />
        <Typography variant="h6" fontWeight={700}>
          My Classes
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 2 }} />
      <List sx={{ flex: 1 }}>
        {classes.map((cls) => (
          <ListItem
            button
            key={cls.classId}
            selected={cls.classId === classId}
            onClick={() => navigate(`/class/${cls.classId}`)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              mx: 1,
              pl: 1.5,
              bgcolor:
                cls.classId === classId
                  ? "rgba(100, 181, 246, 0.16)"
                  : "transparent",
              borderLeft:
                cls.classId === classId
                  ? `4px solid ${darkTheme.accent}`
                  : "4px solid transparent",
              transition: "background 0.2s, border-color 0.2s",
              "&:hover": {
                bgcolor: "rgba(100, 181, 246, 0.08)",
                borderLeft: `4px solid ${darkTheme.accent}`,
              },
              color:
                cls.classId === classId
                  ? darkTheme.accent
                  : darkTheme.textPrimary,
              fontWeight: cls.classId === classId ? 700 : 500,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Avatar
                sx={{
                  bgcolor: darkTheme.accent,
                  width: 36,
                  height: 36,
                  fontWeight: 700,
                  color: darkTheme.card,
                  fontSize: "1.1rem",
                }}
              >
                {cls.name?.[0]?.toUpperCase() || "C"}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: cls.classId === classId ? 700 : 500,
                    color:
                      cls.classId === classId
                        ? darkTheme.accent
                        : darkTheme.textPrimary,
                    opacity: cls.classId === classId ? 1 : 0.85,
                  }}
                >
                  {cls.name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (loading)
    return (
      <Box
        sx={{
          color: darkTheme.textPrimary,
          padding: 4,
          minHeight: "100vh",
          bgcolor: darkTheme.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading classes...
      </Box>
    );
  if (!selectedClass)
    return (
      <Box
        sx={{
          color: darkTheme.textPrimary,
          padding: 4,
          minHeight: "100vh",
          bgcolor: darkTheme.background,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Class not found.
      </Box>
    );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          bgcolor: darkTheme.background,
        }}
      >
        {/* Sidebar */}
        {isMobile ? (
          <>
            <Button
              onClick={() => setMobileOpen(true)}
              sx={{
                position: "fixed",
                top: NAVBAR_HEIGHT + 8,
                left: 16,
                zIndex: 1201,
                minWidth: 0,
                p: 1,
                bgcolor: darkTheme.card,
                color: darkTheme.textPrimary,
                borderRadius: "50%",
                boxShadow: 2,
              }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              open={mobileOpen}
              onClose={() => setMobileOpen(false)}
              variant="temporary"
              ModalProps={{ keepMounted: true }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  bgcolor: darkTheme.card,
                  color: darkTheme.textPrimary,
                  marginTop: `${NAVBAR_HEIGHT}px`,
                  height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                <Button
                  onClick={() => setMobileOpen(false)}
                  sx={{ color: darkTheme.textPrimary }}
                >
                  <CloseIcon />
                </Button>
              </Box>
              {sidebar}
            </Drawer>
          </>
        ) : (
          <Drawer
            variant="permanent"
            open
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                bgcolor: darkTheme.card,
                color: darkTheme.textPrimary,
                marginTop: `${NAVBAR_HEIGHT}px`,
                height: `calc(100% - ${NAVBAR_HEIGHT}px)`,
                borderRight: darkTheme.border,
              },
            }}
          >
            {sidebar}
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            ml: isMobile ? 0 : `${drawerWidth}px`,
            pt: 2,
            pb: 2,
            px: isMobile ? 1 : 3,
            color: darkTheme.textPrimary,
            bgcolor: darkTheme.background,
            minHeight: "100vh",
            marginTop: `${NAVBAR_HEIGHT}px`,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Class Banner */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              mb: 2,
              p: 3,
              background: darkTheme.card,
              border: darkTheme.border,
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: darkTheme.textPrimary }}
            >
              {selectedClass.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: 0.85, color: darkTheme.textSecondary }}
            >
              {selectedClass.description || "Class description"}
            </Typography>
          </Paper>

          {/* Tabs */}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "rgba(255,255,255,0.07)",
              mb: 1,
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  color: darkTheme.textSecondary,
                  fontWeight: 600,
                  minHeight: 36,
                },
                "& .Mui-selected": { color: darkTheme.accent },
              }}
            >
              <Tab label="Stream" icon={<StreamIcon />} iconPosition="start" />
              <Tab
                label="Classwork"
                icon={<AssignmentIcon />}
                iconPosition="start"
              />
              <Tab label="People" icon={<PeopleIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Teacher: Create Assignment Button */}
          {selectedClass.creator === user._id && tab === 1 && (
            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  bgcolor: darkTheme.accent,
                  color: "#fff",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#1976d2" },
                }}
              >
                Create Assignment
              </Button>
            </Box>
          )}

          {/* Tab Content */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {tab === 0 && (
              <>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: darkTheme.card,
                    border: darkTheme.border,
                    color: darkTheme.textSecondary,
                  }}
                >
                  <Typography sx={{ mb: 1, fontWeight: 600 }}>Upcoming</Typography>
                  <Typography>No work due soon!</Typography>
                </Paper>
                {streamPosts.map((post) => (
                  <Paper
                    key={post.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      bgcolor: darkTheme.card,
                      border: darkTheme.border,
                      color: darkTheme.textPrimary,
                    }}
                  >
                    <Avatar sx={{ bgcolor: darkTheme.accent }}>{post.icon}</Avatar>
                    <Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 700, color: darkTheme.textPrimary }}
                      >
                        {post.author}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: darkTheme.textSecondary }}
                      >
                        {post.date}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, color: darkTheme.textSecondary }}
                      >
                        {post.content}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </>
            )}

            {tab === 1 && (
              <Typography variant="body1" sx={{ color: darkTheme.textSecondary }}>
                No assignments yet.
              </Typography>
            )}

            {tab === 2 && (
              <Typography variant="body1" sx={{ color: darkTheme.textSecondary }}>
                People in this class will be listed here.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ClassPage;
