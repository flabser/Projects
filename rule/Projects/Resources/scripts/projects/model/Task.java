package projects.model;

import com.exponentus.common.model.Attachment;
import com.exponentus.dataengine.jpa.SecureAppEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import projects.model.constants.TaskPriorityType;
import projects.model.constants.TaskStatusType;
import reference.model.Tag;
import reference.model.TaskType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

@JsonIgnoreProperties({"url"})
@Entity
@Table(name = "tasks")
@NamedQuery(name = "Task.findAll", query = "SELECT m FROM Task AS m ORDER BY m.regDate")
public class Task extends SecureAppEntity<UUID> {

    @NotNull
    @ManyToOne(optional = true)
    @JoinColumn(nullable = false)
    @JsonProperty("projectId")
    private Project project;

    @JsonProperty("parentTaskId")
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn
    private Task parent;

    @JsonProperty("childrenIds")
    @OneToMany(mappedBy = "parent")
    private List<Task> children;

    @NotNull
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    @JsonProperty("taskTypeId")
    private TaskType taskType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, length = 10)
    private TaskStatusType status = TaskStatusType.UNKNOWN;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskPriorityType priority = TaskPriorityType.NORMAL;

    @Column(length = 2048)
    private String body;

    @JsonProperty("assigneeUserId")
    private Long assignee;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dueDate;

    @JsonProperty("tagIds")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "task_tags")
    private List<Tag> tags;

    @JsonProperty("attachments")
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(name = "task_attachments", joinColumns = {@JoinColumn(name = "parent_id", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "attachment_id", referencedColumnName = "id")})
    private List<Attachment> attachments;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Task getParent() {
        return parent;
    }

    public void setParent(Task parent) {
        this.parent = parent;
    }

    public List<Task> getChildren() {
        return children;
    }

    public void setChildren(List<Task> children) {
        this.children = children;
    }

    public TaskType getTaskType() {
        return taskType;
    }

    public void setTaskType(TaskType taskType) {
        this.taskType = taskType;
    }

    public TaskStatusType getStatus() {
        return status;
    }

    public void setStatus(TaskStatusType status) {
        this.status = status;
    }

    public TaskPriorityType getPriority() {
        return priority;
    }

    public void setPriority(TaskPriorityType priority) {
        this.priority = priority;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getAssignee() {
        return assignee;
    }

    public void setAssignee(Long assignee) {
        this.assignee = assignee;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    @JsonProperty("projectId")
    public String getProjectId() {
        return project != null ? project.getIdentifier() : "";
    }

    @JsonProperty("parentTaskId")
    public String getParentTaskId() {
        return parent != null ? parent.getIdentifier() : "";
    }

    @JsonProperty("childrenIds")
    public List<String> getChildrenTaskIds() {
        return Optional.of(children).orElse(new ArrayList<>()).stream().map(it -> it.getIdentifier()).collect(Collectors.toList());
    }

    @JsonProperty("assigneeUserId")
    public String getAssigneeUserId() {
        return assignee != null ? String.valueOf(assignee.intValue()) : "";
    }

    @JsonProperty("taskTypeId")
    public String getTaslTypeId() {
        return taskType != null ? taskType.getIdentifier() : "";
    }

    @JsonProperty("tagIds")
    public List<String> getTagIds() {
        return Optional.of(tags).orElse(new ArrayList<>()).stream().map(it -> it.getIdentifier()).collect(Collectors.toList());
    }
}
